import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
  TQuestionType,
} from "../models/questionnaire.model";
import { IUser } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

const getEmptyQuestionnaire = (author: IUser): IQuestionnaire => {
  return {
    author,
    subjects: [],
    title: "New Questionnaire",
    question: getEmptyQuestion(),
    description: "",
  };
};

const getEmptyQuestion = (): IQuestion => {
  const question: IQuestion = {
    questionText: "",
    answers: [],
    value: uuidv4(),
  };

  return question;
};

const getEmptyAnswer = (type: TQuestionType): IAnswer => {
  return {
    answerText: "",
    nextQuestion: null,
    value: uuidv4(),
    type,
  };
};

export const questionnaireService = {
  getEmptyQuestionnaire,
  getEmptyQuestion,
  getEmptyAnswer,
};
