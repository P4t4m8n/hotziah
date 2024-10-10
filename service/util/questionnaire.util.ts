import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  TQuestionType,
} from "../models/questionnaire.model";
import { IUserSmall } from "../models/User.model";
import { v4 as uuidv4 } from "uuid";

export const getEmptyQuestionnaire = (author: IUserSmall): IQuestionnaire => {
  return {
    author,
    subjects: [],
    title: "שאלון חדש",
    question: getEmptyQuestion(),
    description: "",
  };
};

export const getEmptyQuestion = (): IQuestion => {
  const question: IQuestion = {
    questionText: "",
    answers: [],
    value: uuidv4(),
  };

  return question;
};

export const getEmptyAnswer = (type: TQuestionType): IAnswer => {
  return {
    answerText: "",
    nextQuestion: null,
    value: uuidv4(),
    type,
  };
};
