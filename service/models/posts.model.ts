import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUser } from "./user.model";

interface IPostBase {
  content: string;
}

export interface IPostDto extends IPostBase, IDto {
  _id?: ObjectId;
  parentId: ObjectId;
  authorId: ObjectId;
}

export interface IPost extends IPostBase {
  _id: string;
  parentId: string;
  author: IUser;
  comments: IPost[];
}

export interface IPostFilter extends IFilter {
  content?: string;
  _id?: string;
  authorName?: string;
}
