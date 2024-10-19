"use server";

import { prisma } from "@/prisma/prismaClient";
import {
  IComment,
  ICommentDto,
  ICommentFilter,
} from "../models/comments.model";
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

export const saveComment = async (comment: IComment): Promise<IComment> => {
  const dto = commentService.toDTO(comment);
  if (comment.id) {
    return await updateComment(dto);
  } else {
    return await createComment(dto);
  }
};

export const createComment = async (
  comment: ICommentDto
): Promise<IComment> => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        authorId: comment.authorId,
        parentId: comment.parentId,
        postId: comment.postId,
      },
      select: commentService.buildSql(),
    });

    return newComment;
  } catch (error) {
    throw handleError(error, "Error creating comment in server");
  }
};

export const updateComment = async (
  comment: ICommentDto
): Promise<IComment> => {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: comment.id },
      data: {
        content: comment.content,
      },
      select: commentService.buildSql(),
    });

    return updatedComment;
  } catch (error) {
    throw handleError(error, "Error updating comment in server");
  }
};
