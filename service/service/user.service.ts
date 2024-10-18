import { IServiceConfig } from "../models/db.model";
import {
  IUser,
  IUserDto,
  IUserSelectSql,
  IUserSmallSelectSql,
} from "../models/user.model";

const toDTO = (user: IUser): IUserDto => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    permission: user.permission,
    isTherapist: user.isTherapist,
    imgUrl: user.imgUrl,
  };
};

const buildSql = (): IUserSelectSql => {
  return {
    id: true,
    username: true,
    email: true,
    firstName: true,
    lastName: true,
    permission: true,
    isTherapist: true,
    imgUrl: true,
  };
};

const buildSmallSql = (): IUserSmallSelectSql => {
  return {
    id: true,
    username: true,
    imgUrl: true,
  };
};

const getEmptyUser = (): IUser => {
  return {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    permission: "USER",
    isTherapist: false,
    imgUrl: "",
  };
};
export const userService: IServiceConfig<
  IUser,
  IUserDto,
  IUserSelectSql,
  IUserSmallSelectSql
> = {
  collectionName: "user",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmptyEntity: getEmptyUser,
};
