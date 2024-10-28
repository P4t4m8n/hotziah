import { IForumDto } from "../models/forum.model";
import { validationService } from "./util.validation";
/**
 * Validates the provided forum data transfer object.
 * Checks the title, description, type, subjects, and admins fields for validity.
 * Title, description, type, and at least one subject and admin are required.
 * @param forumDto - The partial forum data transfer object to be validated.
 * @returns An array of error messages indicating validation failures.
 */
export const validateForumDto = (forumDto: Partial<IForumDto>): string[] => {
  const errors: string[] = [];

  const titleError = validationService.validateLength(
    forumDto.title || "",
    3,
    "Title"
  );
  if (titleError) errors.push(titleError);

  const descriptionError = validationService.validateLength(
    forumDto.description || "",
    40,
    "Description"
  );
  if (descriptionError) errors.push(descriptionError);

  const typeError = validationService.validateLettersAndNumbers(
    forumDto.type || "",
    "Type"
  );
  if (typeError) errors.push(typeError);

  const subjectsError = validationService.validateArrayLength(
    forumDto.subjects || [],
    1,
    "Subject"
  );
  if (subjectsError) errors.push(subjectsError);

  const adminsError = validationService.validateArrayLength(
    forumDto.admins || [],
    1,
    "Admin"
  );
  if (adminsError) errors.push(adminsError);

  return errors;
};
