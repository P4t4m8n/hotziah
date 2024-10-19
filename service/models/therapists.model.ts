/* cSpell:disable */

import { IUser } from "./user.model";

interface TTherapistBase {
  subjects: TTherapistSubject[];
  languages: TTherapistLanguage[];
  meetingType: TTherapistMeeting[];
  gender: TTherapistGender;
  phone: string;
  address: TAddress;
  fullName: string;
  eduction: TTherapistEducation;
}

export interface ITherapist extends TTherapistBase {
  user: IUser;
  _id?: string;
}

export interface ITherapistDto extends TTherapistBase {
  userId: string;
}

export interface ITherapistFilter  {
  subjects?: TTherapistSubject[];
  languages?: TTherapistLanguage[];
  meetingType?: TTherapistMeeting[];
  fullName?: string;
  gender?: TTherapistGender;
  city?: string;
  education?: TTherapistEducation;
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

export const THERAPIST_EDUCATION = [
  "תואר ראשון",
  "תואר שני",
  "אחר",
  'ד"ר',
  "פסיכולוג",
  "פסיכותרפיסט",
  "פסיכיאטר",
  "טיפול קוגניטיבי התנהגותי",
  "טיפול פסיכודינמי",
] as const;
export type TTherapistEducation = (typeof THERAPIST_EDUCATION)[number];

type TAddress = {
  city: string;
  street?: string;
  number?: number;
  zipCode: number;
  enrance?: string;
  floor?: number;
  isAccessible: boolean;
};
