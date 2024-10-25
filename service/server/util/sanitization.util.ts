import { IAddressDto, ITherapistDto } from "@/service/models/therapists.model";
import { IUserDto } from "@/service/models/user.model";
import { handleError } from "./error.util";
import xss from "xss";
import {
  Gender,
  Languages,
  MeetingType,
  TherapistEducation,
} from "@prisma/client";

export const sanitizeTherapistSignupForm = (formData: FormData) => {
  try {
    const username = xss(formData.get("username")?.toString() || "");
    const email = xss(formData.get("email")?.toString() || "");
    const password = xss(formData.get("password")?.toString() || "");
    const firstName = xss(formData.get("firstName")?.toString() || "");
    const lastName = xss(formData.get("lastName")?.toString() || "");
    const phone = xss(formData.get("phone")?.toString() || "");
    const city = xss(formData.get("city")?.toString() || "");
    const street = xss(formData.get("street")?.toString() || "");
    const number = xss(formData.get("number")?.toString() || "");
    const zipCode = xss(formData.get("zipCode")?.toString() || "");
    const entrance = xss(formData.get("entrance")?.toString() || "");
    const floor = xss(formData.get("floor")?.toString() || "");
    const isAccessible = formData.get("address.isAccessible") === "on";
    const subjects = formData
      .getAll("subjects")
      .map((subject) => xss(subject.toString()));
    const languages = formData
      .getAll("languages")
      .map((language) => xss(language.toString()));
    const meetingType = formData
      .getAll("meetingType")
      .map((meetingType) => xss(meetingType.toString()));
    const education = formData
      .getAll("education")
      .map((edu) => xss(edu.toString()));
    const gender = xss(formData.get("gender")?.toString() || "");
    const summary = xss(formData.get("summary")?.toString() || "");

    const userDto: IUserDto = {
      username,
      email,
      password,
      firstName,
      lastName,
      isTherapist: true,
      imgUrl: "imgs/therapist.svg",
      permission: "THERAPIST",
    };
    console.log("userDto:", userDto);

    const therapistDto: Partial<ITherapistDto> = {
      phone,
      gender: gender as Gender,
      subjects,
      summary,
      education: education as TherapistEducation[],
      meetingType: meetingType as MeetingType[],
      languages: languages as Languages[],
    };
    console.log("therapistDto:", therapistDto);

    const addressDto: IAddressDto = {
      city,
      street,
      number,
      zipCode,
      entrance,
      floor,
      isAccessible,
    };
    console.log("addressDto:", addressDto);

    return { userDto, therapistDto, addressDto };
  } catch (error) {
    const err = handleError(error, "Error sanitizing therapist signup form");
    throw err;
  }
};
