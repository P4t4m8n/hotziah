/* cSpell:disable */

import {
  Gender,
  Languages,
  MeetingType,
  TherapistEducation,
} from "@prisma/client";
import { IUser } from "./user.model";
import { IEntity } from "./app.model";

interface TTherapistBase extends IEntity {
  subjects: string[];
  languages: Languages[];
  meetingType: MeetingType[];
  gender: Gender;
  phone: string;
  address?: IAddress | null;
  education: TherapistEducation[];
  summary: string;
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
  languages?: Languages[];
  meetingType?: MeetingType[];
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  city?: string;
  education?: TherapistEducation[];
  take?: number;
  page?: number;
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
