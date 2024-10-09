import { RawDraftContentState } from "draft-js";
import { IUserSmall } from "./User.model";
import { Document } from "mongodb";

export interface IArticle extends RawDraftContentState, Document {
  _id?: string;
  title: string;
  description: string;
  imgUrl: string;
  auther: IUserSmall;
}
