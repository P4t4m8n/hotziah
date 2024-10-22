"use server";

import { prisma } from "@/prisma/prismaClient";
import { ILike, ILikeDto } from "../models/like.model";
import { handleError } from "./util/error.util";
import { userService } from "../service/user.service";

export const createLike = async (likeDto: ILikeDto): Promise<ILike> => {
  try {
    const like = await prisma.like.create({
      data: likeDto,
      select: {
        id: true,
        articleId: true,
        postId: true,
        commentId: true,
        user: {
          select: userService.buildSmallSql(),
        },
      },
    });
    return like;
  } catch (error) {
    const formattedError = handleError(
      error,
      " An error occurred while creating a like"
    );
    throw formattedError;
  }
};

export const deleteLike = async (likeId: string): Promise<boolean> => {
  try {
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
    return true;
  } catch (error) {
    const formattedError = handleError(
      error,
      " An error occurred while deleting a like"
    );
    throw formattedError;
  }
};
