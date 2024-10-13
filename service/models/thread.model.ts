import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUser } from "./user.model";
import { IPost } from "./posts.model";

interface IThreadsBase {
  name: string;
}

export interface IThread extends IThreadsBase {
  _id: string;
  forumId: string;
  author: IUser;
  numOfPosts?: number;
}

export interface IThreadDetails extends IThread {
  posts: IPost[];
}

export interface IThreadDto extends IThreadsBase, IDto {
  _id?: ObjectId;
  forumId: ObjectId;
  authorId: ObjectId;
}

export interface IThreadFilter extends IFilter {
  name?: string;
  forumId?: string;
  authorId?: string;
  _id?: string;
  postId?: string;
}
