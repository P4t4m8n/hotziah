import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUser } from "./user.model";

interface IForumBase {
  name: string;
  description: string;
}

export interface IForumDto extends IForumBase, IDto {
  _id?: ObjectId;
  admins: ObjectId[];
}

export interface IForum extends IForumBase {
  _id: string;
  admins: IUser[];
}

export interface IForumFilter extends IFilter {
  name?: string;
  _id?: string;
  postName?: string;
  threadName?: string;
}
