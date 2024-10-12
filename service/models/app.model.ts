import { Document, ObjectId } from "mongodb";

export interface IDto extends Document {
  _id?: ObjectId;
}

export interface IFilter {
  _id?: string;
}

export type TInputUserFormKeys =
  | "email"
  | "username"
  | "password"
  | "firstName"
  | "lastName";
