import {
  IPost,
  IPostDto,
  IPostSelectSql,
  IPostSmallSelectSql,
} from "../models/post.model";
import { IUserSmall } from "../models/user.model";
import { userService } from "./user.service";

const toDTO = (post: IPost): IPostDto => {
  const { author, ...rest } = post;

  return { ...rest, authorId: author.id! };
};
const getEmpty = (author: IUserSmall, forumId: string): IPost => {
  return {
    id: "",
    content: "",
    author,
    title: "",
    forumId,
    comments: [],
  };
};
const buildSmallSql = (): IPostSmallSelectSql => {
  return {
    id: true,
    title: true,
    content: true,
    forumId: true,
    author: {
      select: userService.buildSmallSql(),
    },
  };
};
const buildSql = (parentId?: string): IPostSelectSql => {
  return {
    id: true,
    title: true,
    content: true,
    forumId: true,
    author: {
      select: userService.buildSmallSql(),
    },
    _count: {
      select: {
        comments: true,
      },
    },
    comments: {
      where: { parentId: parentId || null },
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

export const postService = {
  collectionName: "post",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmpty,
};
