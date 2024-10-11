import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUser } from "./user.model";

interface IPostBase {
  content: string;
}

export interface IPostDto extends IPostBase, IDto {
  _id?: ObjectId;
  threadId: ObjectId;
  authorId: ObjectId;
}

export interface IPost extends IPostBase {
  _id: string;
  threadId: string;
  author: IUser;
}

export interface IPostFilter extends IFilter {
  content?: string;
  _id?: string;
  authorName?: string;
}
