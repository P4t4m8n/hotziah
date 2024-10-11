import { IDto, IFilter } from "./app.model";

interface IUserBase {
  username: string;
  imgUrl?: string;
  permission: TUserPermission;
}
export interface IUser extends IUserBase {
  _id?: string;
  providerId?: string;

}

export interface IUserDto extends IDto, IUserBase {
  providerId?: string;
  provider?: TUserProvider;
}

export interface IUserFIlter extends IFilter {
  username?: string;
  providerId?: string;
  permission?: TUserPermission;
  _id?: string;
}

export const USER_PROVIDERS = ["google", "facebook", "email"] as const;
export type TUserProvider = (typeof USER_PROVIDERS)[number];

export const USER_PERMISSIONS = ["admin", "user"] as const;
export type TUserPermission = (typeof USER_PERMISSIONS)[number];
