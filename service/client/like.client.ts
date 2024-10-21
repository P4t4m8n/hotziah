import { ILike } from "../models/like.model";
import { likeService } from "../service/like.service";
import { apiClientService } from "./api.client";

const create = async (
  userId: string,
  itemId: {
    articleId?: string | null;
    postId?: string | null;
    commentId?: string | null;
  }
): Promise<ILike> => {
  try {
    if (!userId) throw new Error("User not found");
    if (!itemId.articleId && !itemId.postId && !itemId.commentId)
      throw new Error("Item not found");
    const likeDto = likeService.createLikeDto(userId, itemId);

    const like = await apiClientService.post<ILike>("like", { likeDto });
    return like;
  } catch (error) {
    throw error;
  }
};

const remove = async (likeId: string): Promise<void> => {
  try {
    await apiClientService.delete(`like/${likeId}`);
    return;
  } catch (error) {
    console.error("Error removing like:", error);
  }
};

export const likeClientService = {
  create,
  remove,
};
