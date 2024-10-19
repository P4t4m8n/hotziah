import {
  IComment,
  ICommentDto,
  ICommentSelectSql,
  ICommentSmallSelectSql,
} from "../models/comments.model";
import { IServiceConfig } from "../models/db.model";
import { IUserSmall } from "../models/user.model";
import { userService } from "./user.service";

const buildSmallSql = (): ICommentSmallSelectSql => {
  return {
    id: true,
    content: true,
    createdAt: true,
    parentId: true,
    author: {
      select: userService.buildSmallSql(),
    },
    _count: {
      select: {
        replies: true,
      },
    },
  };
};

const buildSql = (commentId: string): ICommentSelectSql => {
  return {
    id: true,
    parentId: true,
    content: true,
    createdAt: true,
    author: {
      select: userService.buildSmallSql!(),
    },
    replies: {
      where: {
        parentId: commentId,
      },
      select: buildSmallSql(),
    },
  };
};

const toDTO = (
  comment: IComment,
  postId: string,
  parentId?: string
): ICommentDto => {
  const dto: ICommentDto = {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    postId,
    parentId: parentId,
    authorId: comment.author.id!,
  };
  return dto;
};

const getEmptyComment = (author: IUserSmall): IComment => {
  return {
    id: "",
    content: "",
    createdAt: new Date(),
    author,
  };
};

export const commentService: IServiceConfig<
  IComment,
  ICommentDto,
  ICommentSelectSql,
  ICommentSmallSelectSql
> = {
  collectionName: "comment",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmptyEntity: getEmptyComment,
};
