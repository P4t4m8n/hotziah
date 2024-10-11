import { RawDraftContentState } from "draft-js";
import { IUser } from "./user.model";
import { Document, ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";

interface IArticleBase extends RawDraftContentState {
  title: string;
  description: string;
  imgUrl: string;
}

export interface IArticle extends IArticleBase {
  _id?: string;
  author: IUser;
}

export interface IArticleDto extends IDto, IArticleBase, Document {
  _id?: ObjectId;
  authorId: ObjectId;
}

export interface IArticleFilter extends IFilter {
  authorName?: string;
  createdAfter?: Date;
  title?: string;
}
