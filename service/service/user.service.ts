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
    ...buildSmallSql(),
    email: true,
    firstName: true,
    lastName: true,
    isTherapist: true,
    imgUrl: true,
  };
};

const buildSmallSql = (): IUserSmallSelectSql => {
  return {
    id: true,
    username: true,
    imgUrl: true,
    permission: true,
    therapistType : true,
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

export const userService = {
  collectionName: "user",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmptyUser,
};
