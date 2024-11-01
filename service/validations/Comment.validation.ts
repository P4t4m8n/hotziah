import { ICommentDto } from "../models/comments.model";
import { validationService } from "./util.validation";

export const validateCommentDto = (
  commentDto: ICommentDto
): Record<"content", string> => {
  const errors: Record<"content", string> = {
    content: "",
  };
  const contentError = validationService.validateLength(
    commentDto.content || "",
    1,
    "Content"
  );
  if (contentError) errors.content = contentError;

  return errors;
};
