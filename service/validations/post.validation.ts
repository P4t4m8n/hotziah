import { IPostDto } from "../models/post.model";
import { validationService } from "./util.validation";

export const validatePostDto = (
  postDto: IPostDto
): Record<TPostEditInputs, string> => {
  const errors: Record<TPostEditInputs, string> = {
    title: "",
    content: "",
    tags: "",
    forumId: "",
    authorId: "",
  };

  const titleError = validationService.validateLength(
    postDto.title || "",
    2,
    "Title"
  );
  if (titleError) errors.title = titleError;

  const contentError = validationService.validateLength(
    postDto.content || "",
    1,
    "Content"
  );
  if (contentError) errors.content = contentError;

  const tagsError = validationService.validateArrayLength(
    postDto.tags || [],
    1,
    "Tags"
  );
  if (tagsError) errors.tags = tagsError;

  const forumIdError = validationService.validateExistence(
    postDto.forumId,
    "Forum ID"
  );
  if (forumIdError) errors.forumId = forumIdError;

  const authorIdError = validationService.validateExistence(
    postDto.authorId,
    "Author ID"
  );
  if (authorIdError) errors.authorId = authorIdError;

  return errors;
};
