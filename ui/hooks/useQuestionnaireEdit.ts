import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  TQuestionnaireSubject,
} from "@/service/models/questionnaire.model";
import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { useUser } from "./useUser";
import { getEmptyQuestionnaire } from "@/service/util/questionnaire.util";
import { apiClientService } from "@/service/client/api.client";

export const useQuestionnaireEdit = (questionnaire?: IQuestionnaire) => {
  const user = useUser().user;
  const [questionnaireToEdit, setQuestionnaireToEdit] =
    useState<IQuestionnaire>(questionnaire || getEmptyQuestionnaire(user!));

  const onSaveQuestionnaire = async () => {
    try {
      const _questionnaire = await apiClientService.put<IQuestionnaire>(
        "",
        questionnaireToEdit
      );
      setQuestionnaireToEdit(_questionnaire);
    } catch (error) {
      console.error(error);
    }
  };

  const findQuestionByValue = (
    question: IQuestion,
    value: string
  ): IQuestion | null => {
    if (question.value === value) {
      return question;
    }

    for (const answer of question.answers) {
      if (answer.nextQuestion) {
        const found = findQuestionByValue(answer.nextQuestion, value);
        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  const findAnswerByValue = (
    question: IQuestion | null,
    value: string
  ): IAnswer | null => {
    if (!question) return null;
    for (const answer of question.answers) {
      if (answer.value === value) {
        return answer;
      }
      if (answer.nextQuestion) {
        const found = findAnswerByValue(answer.nextQuestion, value);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    setQuestionnaireToEdit((prev) => {
      if (name === "subjects" && target instanceof HTMLSelectElement) {
        // Handle multiple select
        const options = Array.from(
          target.selectedOptions,
          (option) => option.value as TQuestionnaireSubject
        );
        return { ...prev, [name]: options };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const saveQuestion = (question: IQuestion, parentAnswerValue?: string) => {
    setQuestionnaireToEdit((prevQuestionnaire) => {
      const questionnaireCopy = _.cloneDeep(prevQuestionnaire);

      if (parentAnswerValue) {
        // Find the parent answer
        const parentAnswer = findAnswerByValue(
          questionnaireCopy.question,
          parentAnswerValue
        );
        if (parentAnswer) {
          parentAnswer.nextQuestion = question;
        }
      } else {
        // Find and update the existing question
        const existingQuestion = findQuestionByValue(
          questionnaireCopy.question!,
          question.value
        );
        if (existingQuestion) {
          // Update the existing question
          Object.assign(existingQuestion, question);
        } else {
          // If not found, set it as the root question
          questionnaireCopy.question = question;
        }
      }

      return questionnaireCopy;
    });
  };

  const removeQuestion = (questionValue: string) => {
    setQuestionnaireToEdit((prevQuestionnaire) => {
      const questionnaireCopy = _.cloneDeep(prevQuestionnaire);

      const removeQuestionRecursively = (
        currentQuestion: IQuestion | null
      ): IQuestion | null => {
        if (!currentQuestion) return null;

        if (currentQuestion.value === questionValue) {
          return null;
        }

        currentQuestion.answers = currentQuestion.answers.map((answer) => {
          if (answer.nextQuestion) {
            answer.nextQuestion = removeQuestionRecursively(
              answer.nextQuestion
            );
          }
          return answer;
        });

        return currentQuestion;
      };

      questionnaireCopy.question = removeQuestionRecursively(
        questionnaireCopy.question
      );

      return questionnaireCopy;
    });
  };

  return {
    handleChange,
    questionnaireToEdit,
    saveQuestion,
    removeQuestion,
    onSaveQuestionnaire,
  };
};
