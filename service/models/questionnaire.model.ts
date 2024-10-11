import { ObjectId } from "mongodb";
import { IUser } from "./user.model";
import { IDto, IFilter } from "./app.model";

interface IQuestionnaireBase {
  subjects: TQuestionnaireSubject[];
  title: string;
  description: string;
  question: IQuestion | null; // Root question
}
export interface IQuestionnaireDto extends IDto, IQuestionnaireBase {
  authorId: ObjectId;
}

export interface IQuestionnaire extends IQuestionnaireBase {
  _id?: string;
  author: IUser;
}

export interface IQuestionnaireFilter extends IFilter {
  subjects?: TQuestionnaireSubject[];
  title?: string;
  authorName?: string;
  createdAfter?: Date;
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
