import { Gender } from "@prisma/client";
import { ITherapistDto } from "../models/therapists.model";

/**
 * Validates a therapist DTO object.
 * Partially as User and Address are validated separately.
 * Checks the subjects, languages, meeting type, education, gender, phone number, and summary fields for errors.
 * Returns an array of error messages if any validation fails.
 *
 * @param therapistDto - The partial therapist DTO object to validate.
 * @returns An array of error messages indicating validation failures.
 */
export const validateTherapistDto = (
  therapistDto: Partial<ITherapistDto>
): string[] => {
  const errors: string[] = [];

  const subjectsError = _validateStringArray(
    therapistDto.subjects || [],
    "subjects"
  );
  if (subjectsError) errors.push(subjectsError);

  const languagesError = _validateStringArray(
    therapistDto.languages || [],
    "languages"
  );
  if (languagesError) errors.push(languagesError);

  const meetingTypeError = _validateStringArray(
    therapistDto.meetingType || [],
    "meetingType"
  );
  if (meetingTypeError) errors.push(meetingTypeError);

  const educationError = _validateStringArray(
    therapistDto.education || [],
    "education"
  );
  if (educationError) errors.push(educationError);

  const genderError = _validateGender(therapistDto.gender || "");
  if (genderError) errors.push(genderError);

  const phoneError = _validatePhone(therapistDto.phone || "");
  if (phoneError) errors.push(phoneError);

  const summaryError = _validateSummary(therapistDto.summary || "");
  if (summaryError) errors.push(summaryError);

  return errors;
};

/**
 * Validates an array of strings based on specific criteria.
 *
 * @param array The array of strings to be validated.
 * @param fieldName The name of the field being validated.
 * @returns A message indicating any validation errors, or null if the array is valid.
 */
const _validateStringArray = (
  array: string[],
  fieldName: string
): string | null => {
  if (!array || array.length === 0) {
    return `${fieldName} must have at least one item.`;
  }
  if (array.length > 30) {
    return `${fieldName} cannot contain more than 30 items.`;
  }
  for (const item of array) {
    if (item.trim().length < 3) {
      return `Each item in ${fieldName} must be at least 3 characters long.`;
    }
  }
  return null;
};

/**
 * Validates the provided gender value.
 *
 * @param gender - The gender value to validate.
 * @returns A string error message if the gender is invalid, otherwise null.
 */
const _validateGender = (gender: string): string | null => {
  const validGenders = Object.values(Gender);
  if (!validGenders.includes(gender as Gender)) {
    return `Gender must be one of: ${validGenders.join(", ")}.`;
  }
  return null;
};

/**
 * Validates the phone number format.
 *
 * @param phone - The phone number to validate in the format xxx-xxxxxxx.
 * @returns A message if the phone number is not in the correct format, otherwise null.
 */
const _validatePhone = (phone: string): string | null => {
  const phonePattern = /^\d{3}-\d{7}$/;
  if (!phone || !phonePattern.test(phone)) {
    return "Phone number must be in the format xxx-xxxxxxx.";
  }
  return null;
};

/**
 * Validates the summary field based on specific criteria.
 *
 * @param summary - The summary to be validated.
 * @returns A message if the summary is invalid, otherwise null.
 */
const _validateSummary = (summary: string): string | null => {
  if (!summary || summary.trim().length < 40) {
    return "Summary must be at least 40 characters long.";
  }
  return null;
};
