"use server";

import { prisma } from "@/prisma/prismaClient";
import { IComment, ICommentFilter } from "../models/comments.model";
import { handleError } from "../util/error.util";
import { commentService } from "../service/comment.service";

export const getComments = async (
  filter: ICommentFilter
): Promise<IComment[]> => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        OR: [
          {
            parentId: filter.parentId,
          },
          {
            author: {
              OR: [
                { username: filter.authorName },
                { email: filter.authorName },
                { firstName: filter.authorName },
                { lastName: filter.authorName },
              ],
            },
          },
          {
            post: {
              OR: [
                { id: filter.parentId },
                { title: filter.postTitle },
                { title: filter.parentTitle },
              ],
            },
          },
          {
            parent: {
              id: filter.parentId,
            },
          },
        ],
      },
      select: commentService.buildSql(),
    });

    return comments;
  } catch (error) {
    const formattedError = handleError(
      error,
      "Error getting comments in server"
    );
    throw formattedError;
  }
};

export const getCommentById = async (commentId: string): Promise<IComment> => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: commentService.buildSql(),
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  } catch (error) {
    throw handleError(error, "Error getting comment by id in server");
  }
};
