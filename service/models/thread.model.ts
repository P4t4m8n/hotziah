import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUser } from "./user.model";

interface IThreadsBase {
  name: string;
}

export interface IThreadDto extends IThreadsBase, IDto {
  _id?: ObjectId;
  forumId: ObjectId;
  authorId: ObjectId;
}

export interface IThread extends IThreadsBase {
  _id: string;
  forumId: string;
  author: IUser;
}

export interface IThreadFilter extends IFilter {
  name?: string;
  forumId?: string;
  authorId?: string;
  _id?: string;
  postId?: string;
}
