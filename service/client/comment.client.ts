import { IComment } from "../models/comments.model";
import { apiClientService } from "./api.client";

export const saveComment = async (
  comment: IComment,
  forumId?: string,
  postId?: string
): Promise<IComment> => {
  if (comment.id) {
    return await updateComment(comment);
  } else {
    return await createComment(comment, forumId, postId);
  }
};

const createComment = async (
  comment: IComment,
  forumId?: string,
  postId?: string
): Promise<IComment> => {
  return await apiClientService.post<IComment>(
    `${forumId}/post/${postId}/comment`,
    {
      comment,
      forumId,
    }
  );
};

const updateComment = async (comment: IComment): Promise<IComment> => {
  return await apiClientService.put<IComment>(`comment/${comment.id}`, comment);
};
