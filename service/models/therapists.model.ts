/* cSpell:disable */

import { ObjectId } from "mongodb";
import { IDto, IFilter } from "./app.model";
import { IUserSmall } from "./User.model";

interface TTherapistBase {
  subjects: TTherapistSubject[];
  languages: TTherapistLanguage[];
  meetingType: TTherapistMeeting[];
  gender: TTherapistGender;
  phone: string;
  address: TAddress;
  fullName: string;
}

export interface ITherapist extends TTherapistBase {
  user: IUserSmall;
  _id?: string;
}

export interface ITherapistDto extends TTherapistBase, IDto {
  userId: ObjectId;
}

export interface ITherapistFilter extends IFilter {
  subjects?: TTherapistSubject[];
  languages?: TTherapistLanguage[];
  meetingType?: TTherapistMeeting[];
  fullName?: string;
  gender?: TTherapistGender;
  city?: string;
}

export const THERAPIST_SUBJECTS = [
  "דכאון",
  "חרדה",
  "לחץ",
  "יחסים",
  "עבודה",
  "חיים",
] as const;
export type TTherapistSubject = (typeof THERAPIST_SUBJECTS)[number];

export const THERAPIST_LANGUAGE = [
  "עברית",
  "אנגלית",
  "רוסית",
  "ערבית",
  "צרפתית",
  "ספרדית",
] as const;
export type TTherapistLanguage = (typeof THERAPIST_LANGUAGE)[number];

export const THERAPIST_GENDER = ["זכר", "נקבה", "אחר"] as const;
export type TTherapistGender = (typeof THERAPIST_GENDER)[number];

export const THERAPIST_MEETING = [
  "פנים אל פנים",
  "טלפון",
  "וידאו",
  "צ'אט",
  "אחר",
] as const;
export type TTherapistMeeting = (typeof THERAPIST_MEETING)[number];

type TAddress = {
  city: string;
  street?: string;
  number?: number;
  zipCode: number;
  enrance?: string;
  floor?: number;
  isAccessible: boolean;
};
