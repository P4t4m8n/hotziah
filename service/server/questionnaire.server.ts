import { Prisma } from "@prisma/client";
import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  IQuestionnaireDto,
} from "../models/questionnaire.model";
import { prisma } from "@/prisma/prismaClient";
import { userService } from "../service/user.service";
/**
 * Retrieves a questionnaire based on the provided questionnaireId.
 *
 * @param {string} questionnaireId - The unique identifier of the questionnaire to retrieve.
 * @returns {Promise<IQuestionnaire>} A Promise that resolves to the retrieved questionnaire.
 * @throws {Error} If the questionnaire or its root question is not found.
 */
export const getQuestionnaireById = async (
  questionnaireId: string
): Promise<IQuestionnaire> => {
  const questionnaire = await prisma.questionnaire.findUnique({
    where: { id: questionnaireId },
    select: {
      id: true,
      title: true,
      description: true,
      subjects: true,
      authorId: true,
      createdAt: true,
      rootQuestionId: true,
      author: {
        select: userService.buildSql(),
      },
    },
  });

  if (!questionnaire || !questionnaire.rootQuestionId) {
    throw new Error("Questionnaire or root question not found");
  }

  const rootQuestion = await _fetchQuestionTree(questionnaire.rootQuestionId);

  return {
    ...questionnaire,
    rootQuestion,
  };
};
/**
 * Fetches a question tree starting from the specified question ID.
 * Uses a queue to manage questions to fetch in batches of 10.
 * Resolves nextQuestion references for each answer after fetching all related questions.
 *
 * @param questionId The ID of the question to start fetching the tree from.
 * @returns A Promise that resolves to the complete question tree with answers and nextQuestion references resolved.
 */
const _fetchQuestionTree = async (questionId: string): Promise<IQuestion> => {
  // Use a queue to keep track of questions to fetch
  const questionQueue: string[] = [questionId];
  const questionMap = new Map<string, IQuestion>();

  while (questionQueue.length > 0) {
    const batchQuestionIds = questionQueue.splice(0, 10); // Fetch in batches of 10
    const questions = await prisma.question.findMany({
      where: { id: { in: batchQuestionIds } },
      select: {
        id: true,
        questionText: true,
        type: true,
        answers: {
          select: {
            id: true,
            answerText: true,
            nextQuestionId: true,
          },
        },
      },
    });

    for (const question of questions) {
      const answersWithPlaceholders = question.answers.map((answer) => {
        if (answer.nextQuestionId && !questionMap.has(answer.nextQuestionId)) {
          questionQueue.push(answer.nextQuestionId);
        }
        return {
          id: answer.id,
          answerText: answer.answerText,
          nextQuestion: null, // Placeholder for now
          nextQuestionId: answer.nextQuestionId,
        };
      });

      questionMap.set(question.id, {
        id: question.id,
        questionText: question.questionText,
        type: question.type,
        answers: answersWithPlaceholders,
      });
    }
  }

  // Now, resolve the nextQuestion references
  for (const question of questionMap.values()) {
    question.answers = question.answers.map((answer: IAnswer) => {
      if (answer.nextQuestionId) {
        answer.nextQuestion = questionMap.get(answer.nextQuestionId) || null;
      }
      delete answer.nextQuestionId; // Clean up
      return answer;
    });
  }

  return questionMap.get(questionId)!;
};
/**
 * Creates a new questionnaire in the database.
 *
 * @param questionnaire - The questionnaire data to be created.
 * @returns A Promise that resolves to the created questionnaire with null rootQuestion.
 */
export const createQuestionnaire = async (
  questionnaire: IQuestionnaireDto
): Promise<IQuestionnaire> => {
  const result = await prisma.questionnaire.create({
    data: {
      title: questionnaire.title,
      description: questionnaire.description,
      subjects: questionnaire.subjects,
      author: {
        connect: {
          id: questionnaire.authorId,
        },
      },
      rootQuestion: {
        create: _buildQuestionCreateInput(questionnaire.rootQuestion!),
      },
    },

    select: {
      author: { select: userService.buildSql() },
      subjects: true,
      title: true,
      description: true,
      createdAt: true,
      id: true,
      rootQuestion: true,
    },
  });
  return { ...result, rootQuestion: null };
};
/**
 * Builds a Prisma include object based on the provided IQuestion.
 * @param question - The IQuestion object to extract data from.
 * @returns A Prisma QuestionCreateWithoutRootQuestionnaireInput object.
 */
const _buildQuestionCreateInput = (
  question: IQuestion
): Prisma.QuestionCreateWithoutRootQuestionnaireInput => {
  return {
    id: question.id,
    questionText: question.questionText,
    type: question.type,
    answers: {
      create: question.answers.map((answer: IAnswer) => ({
        id: answer.id,
        answerText: answer.answerText,
        nextQuestion: answer.nextQuestion
          ? {
              create: _buildQuestionCreateInput(answer.nextQuestion),
            }
          : undefined,
      })),
    },
  };
};
