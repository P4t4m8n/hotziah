import { QuestionType } from "@prisma/client";
import { IEntity } from "./app.model";
import { IUser } from "./user.model";

interface IQuestionnaireBase extends IEntity {
  subjects: string[];
  title: string;
  description: string;
  rootQuestion: IQuestion | null; 
  createdAt?: Date | string;
}
export interface IQuestionnaireDto extends IQuestionnaireBase {
  authorId: string;
}

export interface IQuestionnaire extends IQuestionnaireBase {
  author: IUser;
}

export interface IQuestionnaireFilter {
  subjects?: string[];
  title?: string;
  authorName?: string;
  createdAfter?: Date | string;
  take?: number;
  skip?: number;
}

export interface IAnswer extends IEntity {
  answerText: string;
  nextQuestion: IQuestion | null;
  nextQuestionId?: string | null;

}

export interface IQuestion extends IEntity {
  questionText: string;
  type: QuestionType;
  answers: IAnswer[];
}
