import { IDto, IFilter } from "./app.model";

interface IUserBase {
  username?: string;
  imgUrl?: string;
  email?: string;
  permission?: TUserPermission;

  firstName?: string;
  lastName?: string;
}
export interface IUser extends IUserBase {
  _id?: string;
}

export interface IUserDto extends IDto, IUserBase {
  password?: string;
}

export interface IUserFIlter extends IFilter {
  username?: string;
  provider?: TUserProvider;
  providerId?: string;
  permission?: TUserPermission;
  _id?: string;
  email?: string;
}

export const USER_PROVIDERS = ["google", "facebook", "email"] as const;
export type TUserProvider = (typeof USER_PROVIDERS)[number];

export const USER_PERMISSIONS = ["admin", "user"] as const;
export type TUserPermission = (typeof USER_PERMISSIONS)[number];
