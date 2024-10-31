import { Gender, TherapistStatus } from "@prisma/client";
import { IUser } from "./user.model";
import { IEntity } from "./app.model";

interface TTherapistBase extends IEntity {
  subjects: string[];
  languages: string[];
  meetingType: string[];
  gender: Gender;
  phone: string;
  address?: IAddress | null;
  education: string[];
  summary: string;
  status: TherapistStatus;
}
export interface ITherapist extends TTherapistBase {
  user?: IUser;
}
export interface ITherapistDto extends TTherapistBase {
  userId: string;
  addressId: string;
}
export interface ITherapistFilter {
  subjects?: string[];
  languages?: string[];
  meetingType?: string[];
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  city?: string;
  education?: string[];
  take?: number;
  page?: number;
  status?: TherapistStatus;
}
export interface IAddressDto extends IEntity {
  city: string;
  street?: string;
  number?: string;
  zipCode?: string;
  entrance?: string;
  floor?: string;
  isAccessible: boolean;
}
export interface IAddress extends IEntity {
  city: string;
  street?: string | null;
  number?: string | null;
  zipCode?: string | null;
  entrance?: string | null;
  floor?: string | null;
  isAccessible: boolean;
}
