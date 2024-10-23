import {
  Gender,
  Languages,
  MeetingType,
  TherapistEducation,
} from "@prisma/client";
import { ITherapistFilter } from "../models/therapists.model";

const buildSql = () => {
  return {
    id: true,
    subjects: true,
    languages: true,
    meetingType: true,
    gender: true,
    phone: true,
    education: true,
    summary: true,
    address: {
      select: {
        id: true,
        city: true,
        street: true,
        isAccessible: true,
        number: true,
        zipCode: true,
        floor: true,
        entrance: true,
      },
    },
    user: {
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        imgUrl: true,
        permission: true,
        isTherapist: true,
      },
    },
  };
};

const getEmptyFilter = (): ITherapistFilter => {
  return {
    subjects: [""],
    languages: ["" as Languages],
    meetingType: ["" as MeetingType],
    firstName: "",
    lastName: "",
    gender: "" as Gender,
    city: "",
    education: ["" as TherapistEducation],
  };
};

export const therapistService = {
  buildSql,
  getEmptyFilter,
};
