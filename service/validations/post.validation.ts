import { IPostDto } from "../models/post.model";
import { validationService } from "./util.validation";

export const validatePostDto = (postDto: IPostDto): string[] => {
  const errors: string[] = [];

  const titleError = validationService.validateLength(
    postDto.title || "",
    2,
    "Title"
  );
  if (titleError) errors.push(titleError);

  const contentError = validationService.validateLength(
    postDto.content || "",
    1,
    "Content"
  );
  if (contentError) errors.push(contentError);

  const tagsError = validationService.validateArrayLength(
    postDto.tags || [],
    1,
    "Tags"
  );
  if (tagsError) errors.push(tagsError);

  const forumIdError = validationService.validateExistence(
    postDto.forumId,
    "Forum ID"
  );
  if (forumIdError) errors.push(forumIdError);

  const authorIdError = validationService.validateExistence(
    postDto.authorId,
    "Author ID"
  );
  if (authorIdError) errors.push(authorIdError);

  return errors;
};
