import { ObjectId } from "mongodb";

export interface IDto {
  _id?: ObjectId;
}

export interface IFilter {
  _id?: string;
}
