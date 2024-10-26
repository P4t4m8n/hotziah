import { Gender } from "@prisma/client";
import { ITherapist, ITherapistFilter } from "../models/therapists.model";
import { addressService } from "./address.service";
import { userService } from "./user.service";

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
    languages: [""],
    meetingType: [""],
    firstName: "",
    lastName: "",
    gender: "" as Gender,
    city: "",
    education: [""],
  };
};

const getEmpty = (): ITherapist => {
  return {
    subjects: [""],
    languages: [""],
    meetingType: [""],
    gender: "FEMALE",
    phone: "",
    address: addressService.getEmpty(),
    education: [""],
    summary: "",
    user: userService.getEmptyUser(),
  };
};

export const therapistService = {
  buildSql,
  getEmptyFilter,
  getEmpty,
};
