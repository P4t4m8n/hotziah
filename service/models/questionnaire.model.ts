import { ObjectId } from "mongodb";
import { IUserSmall } from "./User.model";

export interface IQuestionnaireBase {
  subjects: TQuestionnaireSubject[];
  title: string;
  description: string;
  question: IQuestion | null; // Root question
}
export interface IQuestionnaireDTO extends IQuestionnaireBase {
  authorId: ObjectId;
  _id?: ObjectId;
}

export interface IQuestionnaire extends IQuestionnaireBase {
  _id?: string;
  author: IUserSmall;
}

export interface IQuestionnaireFilter {
  subjects?: TQuestionnaireSubject[];
  title?: string;
  authorName?: string;
  createdAfter?: Date;
  _id?: string;
}

export interface IAnswer {
  answerText: string;
  nextQuestion: IQuestion | null;
  value: string; // Unique identifier for the question
  type: TQuestionType;
}
export interface IQuestion {
  questionText: string;
  value: string; // Unique identifier for the answer
  answers: IAnswer[];
}

export const QUESTION_TYPE = ["בחירה", "פתוח"] as const;
export type TQuestionType = (typeof QUESTION_TYPE)[number];

export const QUESTIONNAIRE_SUBJECTS = [
  "",
  "דכאון",
  "חרדה",
  "לחץ",
  "יחסים",
  "עבודה",
  "חיים",
] as const;
export type TQuestionnaireSubject = (typeof QUESTIONNAIRE_SUBJECTS)[number];
