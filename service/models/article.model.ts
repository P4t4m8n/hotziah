import { RawDraftContentState } from "draft-js";
import { IUser } from "./user.model";

interface IArticleBase extends RawDraftContentState {
  title: string;
  description: string;
  imgUrl: string;
}

export interface IArticle extends IArticleBase {
  _id?: string;
  author: IUser;
}

export interface IArticleDto extends IArticleBase {
  _id?: string;
  authorId: string;
}

export interface IArticleFilter {
  authorName?: string;
  createdAfter?: Date;
  title?: string;
}
