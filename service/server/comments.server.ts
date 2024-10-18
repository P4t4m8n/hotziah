"user server";

import { prisma } from "@/prisma/prismaClient";
import { IComment, ICommentFilter } from "../models/comments.model";
import { handleError } from "../util/error.util";
import { userService } from "./user.server";

const query = async (filter: ICommentFilter): Promise<IComment[]> => {
  try {
    const comments = prisma.comment.findMany({
      where: {
        parentId: filter.parentId,
      },
      select: {
        id: true,
        content: true,
        author: {
          select: userService.buildSmallSql!(),
        },
      },
    });

    return comments;
  } catch (error) {
    throw handleError(error, "Error getting comments in comment service");
  }
};

export const commentServer = {
  query,
};
