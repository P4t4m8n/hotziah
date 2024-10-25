import { IAddressDto, ITherapistDto } from "@/service/models/therapists.model";
import { IUserDto } from "@/service/models/user.model";
import { handleError } from "./error.util";
import xss from "xss";
import { Gender } from "@prisma/client";

/**
 * Sanitizes the therapist signup form data by applying XSS protection to the input fields.
 *
 * @param formData - The form data containing therapist signup information.
 * @returns An object containing sanitized user data, therapist data, and address data.
 * @throws Throws an error if there is an issue during the sanitization process.
 */
export const sanitizeTherapistSignupForm = (formData: FormData) => {
  try {
    const phone = xss(formData.get("phone")?.toString() || "");
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

    const userDto: IUserDto = sanitizeUserSignupForm(formData);
    userDto.isTherapist = true;
    userDto.permission = "THERAPIST";
    console.log("userDto:", userDto);

    const therapistDto: Partial<ITherapistDto> = {
      phone,
      gender: gender as Gender,
      subjects,
      summary,
      education,
      meetingType,
      languages,
    };
    console.log("therapistDto:", therapistDto);

    const addressDto: IAddressDto = sanitizeAddressForm(formData);
    console.log("addressDto:", addressDto);

    return { userDto, therapistDto, addressDto };
  } catch (error) {
    const err = handleError(error, "Error sanitizing therapist signup form");
    throw err;
  }
};

/**
 * Sanitizes the user signup form data by applying XSS protection to the input fields.
 *
 * @param formData - The form data containing user signup information.
 * @returns An object containing sanitized user data.
 * @throws Throws an error if there is an issue during the sanitization process.
 */
export const sanitizeUserSignupForm = (formData: FormData) => {
  try {
    const username = xss(formData.get("username")?.toString() || "");
    const email = xss(formData.get("email")?.toString() || "");
    const password = xss(formData.get("password")?.toString() || "");
    const firstName = xss(formData.get("firstName")?.toString() || "");
    const lastName = xss(formData.get("lastName")?.toString() || "");

    const userDto: IUserDto = {
      username,
      email,
      password,
      firstName,
      lastName,
      isTherapist: false,
      imgUrl: "imgs/user.svg",
      permission: "USER",
    };

    return userDto;
  } catch (error) {
    const err = handleError(error, "Error sanitizing user signup form");
    throw err;
  }
};

/**
 * Sanitizes the address form data by applying XSS protection to the input fields.
 *
 * @param formData - The form data containing address information.
 * @returns An object containing sanitized address data.
 * @throws Throws an error if there is an issue during the sanitization process.
 */
export const sanitizeAddressForm = (formData: FormData) => {
  try {
    const city = xss(formData.get("city")?.toString() || "");
    const street = xss(formData.get("street")?.toString() || "");
    const number = xss(formData.get("number")?.toString() || "");
    const zipCode = xss(formData.get("zipCode")?.toString() || "");
    const entrance = xss(formData.get("entrance")?.toString() || "");
    const floor = xss(formData.get("floor")?.toString() || "");
    const isAccessible = formData.get("isAccessible") === "on";

    const addressDto: IAddressDto = {
      city,
      street,
      number,
      zipCode,
      entrance,
      floor,
      isAccessible,
    };

    return addressDto;
  } catch (error) {
    const err = handleError(error, "Error sanitizing address form");
    throw err;
  }
};
