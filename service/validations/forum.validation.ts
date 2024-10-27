import { IForumDto } from "../models/forum.model";
/**
 * Validates the provided forum data transfer object.
 * Checks the title, description, type, subjects, and admins fields for validity.
 * Title, description, type, and at least one subject and admin are required.
 * @param forumDto - The partial forum data transfer object to be validated.
 * @returns An array of error messages indicating validation failures.
 */
export const validateForumDto = (forumDto: Partial<IForumDto>): string[] => {
  const errors: string[] = [];

  const titleError = _validateTitle(forumDto.title || "");
  if (titleError) errors.push(titleError);

  const descriptionError = _validateDescription(forumDto.description || "");
  if (descriptionError) errors.push(descriptionError);

  const typeError = _validateType(forumDto.type || "");
  if (typeError) errors.push(typeError);

  const subjectsError = _validateSubjects(forumDto.subjects || []);
  if (subjectsError) errors.push(subjectsError);

  const adminsError = _validateAdmins(forumDto.admins || []);
  if (adminsError) errors.push(adminsError);

  return errors;
};
/**
 * Validates the title input.
 * @param title - The title to validate.
 * @returns A string with an error message if the title is invalid, otherwise null.
 */
const _validateTitle = (title: string): string | null => {
  if (title.trim().length < 3) {
    return "Title must be at least 3 characters long.";
  }
  return null;
};
/**
 * Validates the description input.
 * @param description - The description to validate.
 * @returns A string with an error message if the description is invalid, otherwise null.
 */
const _validateDescription = (description: string): string | null => {
  if (description.trim().length < 40) {
    return "Description must be at least 40 characters long.";
  }
  return null;
};
/**
 * Validates the type input.
 * @param type - The type to validate.
 * @returns A string with an error message if the type is invalid, otherwise null.
 */
const _validateType = (type: string): string | null => {
  if (type.trim().length < 2 || !/^[a-zA-Z0-9]+$/.test(type)) {
    return "Type must be at least 2 characters long and contain only letters and numbers.";
  }
  return null;
};
/**
 * Validates the subjects array.
 * @param subjects - The subjects array to validate.
 * @returns A string with an error message if the subjects array is invalid, otherwise null.
 */
const _validateSubjects = (subjects: string[]): string | null => {
  if (subjects.length < 1) {
    return "At least one subject is required.";
  }
  return null;
};
/**
 * Validates the admins array.
 * @param admins - The admins array to validate.
 * @returns A string with an error message if the admins array is invalid, otherwise null.
 */
const _validateAdmins = (admins: string[]): string | null => {
  if (admins.length < 1) {
    return "At least one admin is required.";
  }
  return null;
};
