import { ObjectId } from "mongodb";
import { IDto } from "./app.model";

interface ISessionBase {
  userId: string;
  expiresAt: Date;
  createAt: Date;
  token: string;
}
export interface ISession extends ISessionBase {
  _id?: string;
}
export interface ISessionDto extends IDto, ISessionBase {
  _id?: ObjectId;
}

export interface ISessionFilter {
  token?: string;
  userId?: string;
}
