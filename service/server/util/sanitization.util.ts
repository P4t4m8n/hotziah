import { IAddressDto, ITherapistDto } from "@/service/models/therapists.model";
import { IUserDto } from "@/service/models/user.model";
import { handleError } from "./error.util";
import xss from "xss";
import { Gender, ReportStatus } from "@prisma/client";
import { IForumDto } from "@/service/models/forum.model";
import { IReportDto } from "@/service/models/report.model";

/**
 * Sanitizes the therapist signup form data by extracting and sanitizing user, therapist, and address information.
 *
 * @param {FormData} formData - The form data containing therapist signup details.
 * @returns {Object} An object containing sanitized user, therapist, and address data.
 * @throws {Error} If an error occurs during the sanitization process.
 */
export const sanitizeTherapistSignupForm = (
  formData: FormData
): {
  userDto: IUserDto;
  therapistDto: Partial<ITherapistDto>;
  addressDto: IAddressDto;
} => {
  try {
    const userDto: IUserDto = sanitizeUserSignupForm(formData);
    userDto.isTherapist = true;
    userDto.permission = "THERAPIST";

    const therapistDto: Partial<ITherapistDto> =
      sanitizeTherapistForm(formData);

    const addressDto: IAddressDto = sanitizeAddressForm(formData);

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
      imgUrl: "",
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
/**
 * Sanitizes the therapist form data by applying XSS protection to the input fields.
 *
 * @param formData - The form data containing therapist information.
 * @returns A sanitized partial therapist DTO object with protected fields like phone, subjects, languages, meeting type, education, gender, and summary.
 * @throws Throws an error if there is an issue during the sanitization process.
 */
export const sanitizeTherapistForm = (formData: FormData) => {
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
    const id = xss(formData.get("id")?.toString() || "");
    const userId = xss(formData.get("userId")?.toString() || "");

    const therapistDto: Partial<ITherapistDto> = {
      id,
      userId,
      phone,
      gender: gender as Gender,
      subjects,
      summary,
      education,
      meetingType,
      languages,
    };

    return therapistDto;
  } catch (error) {
    const err = handleError(error, "Error sanitizing therapist form");
    throw err;
  }
};
/**
 * Sanitizes the form data for a forum by applying XSS protection to the title, description, type, subjects, and admins fields.
 *
 * @param formData - The form data containing the forum details to be sanitized.
 * @returns An IForumDto object with sanitized forum details.
 * @throws Throws an error if there is an issue during the sanitization process.
 */
export const sanitizeForumForm = (formData: FormData): IForumDto => {
  try {
    const title = xss(formData.get("title")?.toString() || "");
    console.log("title:", title);
    const description = xss(formData.get("description")?.toString() || "");
    const type = xss(formData.get("type")?.toString() || "");
    const subjects = formData
      .getAll("subjects")
      .map((subject) => xss(subject.toString()));
    const admins = formData
      .getAll("admins")
      .map((admin) => xss(admin.toString()));

    const forumDto: IForumDto = {
      title,
      description,
      type,
      subjects,
      admins,
    };

    return forumDto;
  } catch (error) {
    const err = handleError(error, "Error sanitizing forum form");
    throw err;
  }
};
/**
 * Sanitizes the input post form data to prevent cross-site scripting (XSS) attacks.
 *
 * @param {Object} postForm - The post form data to be sanitized.
 * @param {string} postForm.title - The title of the post.
 * @param {string} postForm.content - The content of the post.
 * @param {string[]} postForm.tags - The tags associated with the post.
 * @returns {Object} - The sanitized post form data with title, content, and tags sanitized against XSS.
 * @throws {Error} - If an error occurs during the sanitization process.
 */
export const sanitizePostForm = ({
  title,
  content,
  tags,
}: {
  title: string;
  content: string;
  tags: string[];
}) => {
  try {
    const sanitizedTitle = xss(title);
    const sanitizedContent = xss(content);
    const sanitizedTags = tags.map((tag) => xss(tag));

    return {
      title: sanitizedTitle,
      content: sanitizedContent,
      tags: sanitizedTags,
    };
  } catch (error) {
    const err = handleError(error, "Error sanitizing post form");
    throw err;
  }
};

export const sanitizeReportForm = (dto: IReportDto): IReportDto => {
  try {
    const reason = xss(dto.reason);
    const content = xss(dto.content);
    const status = xss(dto.status) as ReportStatus;

    return { ...dto, reason, content, status };
  } catch (error) {
    const err = handleError(error, "Error sanitizing report form");
    throw err;
  }
};
