/* cSpell:disable */

import { IAnswer, IQuestion } from "@/service/models/questionnaire.model";
import { useModel } from "@/ui/hooks/useModel";
import { AddSvg } from "@/ui/Icons/Svgs";
import { ChangeEvent, useRef, useState } from "react";

import GeneralMenu from "../../../Menus/GeneralMenu";
import { IMenu } from "@/service/models/menu.model";
import { questionnaireService } from "@/service/service/questionnaire.service";
import { QuestionType } from "@prisma/client";

interface Props {
  saveQuestion: (question: IQuestion, parentAnswerValue?: string) => void;
  question: IQuestion;
  answer?: IAnswer;
  isNew: boolean;
}
export default function EditQuestionModel({
  question,
  saveQuestion,
  answer,
  isNew,
}: Props) {
  const [questionToEdit, setQuestionToEdit] = useState<IQuestion>(question);
  const modelRef = useRef(null);

  const [isOpen, setIsOpen] = useModel(modelRef, onSaveQuestion);

  function onSaveQuestion() {
    saveQuestion(questionToEdit, answer?.id);
    if (isNew) setQuestionToEdit(questionnaireService.getEmptyQuestion());
    setIsOpen(false);
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setQuestionToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (e: ChangeEvent, index: number) => {
    const { name, value } = e.target as HTMLInputElement;
    setQuestionToEdit((prev) => {
      const answers = prev.answers.map((answer, i) => {
        if (i === index) {
          return { ...answer, [name]: value };
        }
        return answer;
      });

      return { ...prev, answers };
    });
  };

  const addAnswer = (type: QuestionType = "MULTIPLE_CHOICE") => {
    const answer = questionnaireService.getEmptyAnswer();
    setQuestionToEdit((prev) => ({
      ...prev,
      answers: [...prev.answers, answer],
    }));
  };

  const removeAnswer = (index: number) => {
    setQuestionToEdit((prev) => ({
      ...prev,
      answers: prev.answers.filter((_, i) => i !== index),
    }));
  };

  const { answers, questionText } = questionToEdit;

  const menuItems: IMenu = {
    menuBtn: {
      text: "Add Answer",
      style: " bg-white text-black p-1 rounded-md",
    },
    menuStyle: "flex gap-2 pt-4",
    items: [
      {
        text: "Select",
        onClick: () => addAnswer("MULTIPLE_CHOICE"),
        style: "bg-white text-black p-1 rounded-md",
      },
      {
        text: "פתוח",
        onClick: () => addAnswer("TEXT"),
        style: "bg-white text-black p-1 rounded-md",
      },
    ],
  };

  return (
    <div className=" " ref={modelRef}>
      <button
        className=" bg-inherit text-cyan-50"
        onClick={() => setIsOpen(true)}
      >
        {!isNew ? <AddSvg /> : "חדש"}
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSaveQuestion();
        }}
        className={`${
          isOpen ? "block" : "hidden"
        } center-model  shadow-model flex flex-col p-4 gap-4 w-full min-w-24 max-w-96 z-50 bg-black text-white`}
      >
        <input
          type="text"
          name="questionText"
          value={questionText}
          onChange={handleChange}
          placeholder="שאלה"
          className="z-10 text-black"
        />

        <div className="flex flex-col gap-4">
          <h3 className=" pb-2">שאלות:</h3>
          {answers.map((answer, index) => (
            <div className=" flex flex-col gap-2" key={index}>
              {questionToEdit.type !== "TEXT" ? (
                <>
                  <input
                    onChange={(e) => handleAnswerChange(e, index)}
                    name="answerText"
                    type="text"
                    value={answer.answerText}
                    placeholder="תשובה"
                    className=" text-black"
                  />
                </>
              ) : (
                <span className=" bg-slate-400 text-black p-1 rounded-md">
                  תשובה פתוחה
                </span>
              )}
              <button onClick={() => removeAnswer(index)}>מחק</button>
            </div>
          ))}
          <GeneralMenu menuItems={menuItems} />
        </div>

        <button type="submit" className="bg-cyan-50 text-black p-1 rounded-md">
          שמור
        </button>
      </form>
    </div>
  );
}
