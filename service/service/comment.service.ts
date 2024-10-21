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
    postId: true,
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
    postId: true,
    author: {
      select: userService.buildSmallSql!(),
    },
    replies: {
      where: {
        parentId: commentId,
      },
      select: {
        id: true,
        parentId: true,
        content: true,
        createdAt: true,
        postId: true,
        author: {
          select: {
            id: true,
            username: true,
            imgUrl: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    },
  };
};

const toDTO = (comment: IComment): ICommentDto => {
  const dto: ICommentDto = {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    postId: comment.postId,
    parentId: comment.parentId,
    authorId: comment.author.id!,
  };
  return dto;
};

const getEmptyComment = (author: IUserSmall, postId: string): IComment => {
  return {
    id: "",
    content: "",
    createdAt: new Date(),
    author,
    postId,
  };
};

const getEmptyCommentDto = (authorId: string, postId: string): ICommentDto => {
  return {
    id: "",
    content: "",
    createdAt: new Date(),
    authorId,
    postId,
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
  getEmptyDto: getEmptyCommentDto,
};
