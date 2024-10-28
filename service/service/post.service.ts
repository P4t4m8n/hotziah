import {
  IPost,
  IPostDto,
  IPostSelectSql,
  IPostSmallSelectSql,
} from "../models/post.model";
import { userService } from "./user.service";

const toDTO = (post: IPost): IPostDto => {
  const { author, ...rest } = post;

  return { ...rest, authorId: author.id! };
};
const getEmpty = (forumId: string): IPost => {
  return {
    id: "",
    content: "",
    author: userService.getEmptyUser(),
    title: "",
    forumId,
    comments: [],
    tags: [],
  };
};
const buildSmallSql = (): IPostSmallSelectSql => {
  return {
    id: true,
    title: true,
    content: true,
    forumId: true,
    tags: true,
    isPinned: true,
    createdAt: true,
    updatedAt: true,
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
    tags: true,
    isPinned: true,
    createdAt: true,
    updatedAt: true,
    author: {
      select: userService.buildSmallSql(),
    },
    _count: {
      select: {
        comments: true,
        likes: true,
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
          select: userService.buildSmallSql(),
        },
        _count: {
          select: {
            replies: true,
            likes: true,
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
