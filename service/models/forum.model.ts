import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUser } from "./user.model";
import { IThreadDetails } from "./thread.model";

interface IForumBase {
  name: string;
  description: string;
  type: TForumType;
}

export interface IForum extends IForumBase {
  _id: string;
  admins: IUser[];
}

export interface IForumDetails extends IForum {
  threads: IThreadDetails[];
  numOfThreads?: number; //include in case only fetching forums for preview instead of fetching all the threads
}

export interface IForumDto extends IForumBase, IDto {
  _id?: ObjectId;
  admins: ObjectId[];
}

export interface IForumFilter extends IFilter {
  name?: string;
  _id?: string;
  postName?: string;
  threadName?: string;
  type?: TForumType;
}

export const FORUM_TYPE = [
  "public",
  "private",
  "restricted",
  "technical",
  "social",
] as const;

export type TForumType = (typeof FORUM_TYPE)[number];
