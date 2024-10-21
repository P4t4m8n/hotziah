import { ILike, ILikeDto } from "../models/like.model";

const createLikeDto = (
  userId: string,
  itemId: { articleId?: string|null; postId?: string|null; commentId?: string|null }
): ILikeDto => {
  return {
    ...itemId,
    userId,
  };
};

const toDTO = (like: ILike): ILikeDto => {
  return {
    articleId: like.articleId,
    postId: like.postId,
    commentId: like.commentId,
    userId: like.user.id!,
  };
};

export const likeService = {
  createLikeDto,
  toDTO,
};
