import { IComment, ICommentDto } from "../models/comments.model";
import { commentService } from "../service/comment.service";
import { apiClientService } from "./api.client";

export const saveComment = async (comment: IComment): Promise<IComment> => {
  const dto = commentService.toDTO(comment);
  if (comment.id) {
    return await updateComment(dto);
  } else {
    return await createComment(dto);
  }
};

const createComment = async (comment: ICommentDto): Promise<IComment> => {
  return await apiClientService.post<IComment>(`comment`, {
    comment,
  });
};

const updateComment = async (comment: ICommentDto): Promise<IComment> => {
  return await apiClientService.put<IComment>(`comment/${comment.id}`, comment);
};
