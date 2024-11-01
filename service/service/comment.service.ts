import {
  IComment,
  ICommentDto,
  ICommentSelectSql,
  ICommentSmallSelectSql,
} from "../models/comments.model";
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

const buildSql = (commentId: string | null): ICommentSelectSql => {
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
      select: buildSmallSql(),
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

const getEmpty = (postId: string, author?: IUserSmall): IComment => {
  return {
    id: "",
    content: "",
    createdAt: new Date(),
    author: author || userService.getEmptyUser(),
    postId,
  };
};

const getEmptyDto = (authorId: string, postId: string): ICommentDto => {
  return {
    id: "",
    content: "",
    createdAt: new Date(),
    authorId,
    postId,
  };
};

export const commentService = {
  collectionName: "comment",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmpty,
  getEmptyDto,
};
