import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
} from "../models/questionnaire.model";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../models/user.model";

const getEmptyQuestionnaire = (author: IUser): IQuestionnaire => {
  return {
    author,
    subjects: [],
    title: "New Questionnaire",
    rootQuestion: getEmptyQuestion(),
    description: "",
  };
};

const getEmptyQuestion = (): IQuestion => {
  const question: IQuestion = {
    questionText: "",
    answers: [],
    type: "MULTIPLE_CHOICE",
    id: uuidv4(),
  };

  return question;
};

const getEmptyAnswer = (): IAnswer => {
  return {
    answerText: "",
    nextQuestion: null,
  };
};

export const questionnaireService = {
  getEmptyQuestionnaire,
  getEmptyQuestion,
  getEmptyAnswer,
};
