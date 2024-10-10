"use client";
import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  QUESTIONNAIRE_SUBJECTS,
  TQuestionnaireSubject,
} from "@/service/models/questionnaire.model";
import { ChangeEvent, useState } from "react";

import _ from "lodash";
import QuestionPreview from "./QuestionPreview";

interface Props {
  questionnaire: IQuestionnaire;
  saveQuestionnaire: (questionnaire: IQuestionnaire) => Promise<IQuestionnaire>;
}
export default function QuestionnaireEditClient({
  questionnaire,
  saveQuestionnaire,
}: Props) {
  const [questionnaireToEdit, setQuestionnaireToEdit] =
  useState<IQuestionnaire>(questionnaire);

  const onSaveQuestionnaire = async () => {
    try {
      const _questionnaire = await saveQuestionnaire(questionnaireToEdit);
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

  const { title, description, subjects, question } = questionnaireToEdit;
  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col gap-2">
        <label className="" htmlFor="title">
          כותרת:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder=""
          className="w-title-bar bg-slate-600 rounded-lg"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subjects">Subjects:</label>
        <select
          id="subjects"
          name="subjects"
          multiple
          value={subjects}
          onChange={handleChange}
        >
          {QUESTIONNAIRE_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">תקציר:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 255) {
              handleChange(e);
            }
          }}
          maxLength={255}
          required
          className="w-full  resize-none bg-slate-600 rounded-lg h-auto"
        />
        <p>{description.length}/255</p>
      </div>

      <div className="w-full h-[23rem] overflow-auto bg-gray-950 p-4">
        <h2 className="text-white">שאלות</h2>

        {question && (
          <QuestionPreview
            question={question}
            removeQuestion={removeQuestion}
            saveQuestion={saveQuestion}
            isRoot={true}
          />
        )}
      </div>

      <button
        className="bg-black text-white p-2 rounded-md mr-[50%]"
        onClick={onSaveQuestionnaire}
      >
        שמור
      </button>
    </div>
  );
}
