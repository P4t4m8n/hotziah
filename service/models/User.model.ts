import { IEntity } from "./app.model";
import { Permission } from "@prisma/client";
import { ISelectSql, IWhereSql } from "./db.model";

export interface IUserSmall extends IEntity {
  imgUrl: string;
  username: string;
  permission?: Permission;
  therapistType?: string | null;
}

export interface IUser extends IUserSmall {
  email: string;
  permission: Permission;
  firstName: string;
  lastName: string;
  isTherapist: boolean;
}

export interface IUserDto extends IUser {
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserFilter extends IEntity {
  username?: string;
  id?: string;
  email?: string;
  take?: number;
  page?: number;
  isTherapist?: boolean;
  firstName?: string;
  lastName?: string;
  permission?: Permission;
}

export interface IUserWhereSql extends IWhereSql {
  where: {
    isTherapist?: { equals: boolean };
    username?: { contains: string };
    email?: { contains: string };
    permission?: { equals: string };
    firstName?: { contains: string };
    lastName?: { contains: string };
    id?: string;
  };
  take: number;
  skip: number;
}

export interface IUserSelectSql extends IUserSmallSelectSql {
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  permission: boolean;
  isTherapist: boolean;
}

export interface IUserSmallSelectSql extends ISelectSql {
  username: boolean;
  imgUrl: boolean;
  permission: boolean;
  therapistType: boolean;
}
