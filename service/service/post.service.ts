import { IServiceConfig } from "../models/db.model";
import { IPost, IPostDetailedSelectSql, IPostDto, IPostSelectSql } from "../models/post.model";
import { IUserSmall } from "../models/user.model";
import { userService } from "../server/user.server";

const toDTO = (post: IPost): IPostDto => {
  const { author, ...rest } = post;

  return { ...rest, authorId: author.id! };
};

const getEmptyPost = (author: IUserSmall, forumId: string): IPost => {
  return {
    id: "",
    content: "",
    author,
    title: "",
    forumId,
    comments: [],
  };
};

const buildSmallSql = (): IPostSelectSql => {
  return {
    id: true,
    title: true,
    content: true,
    forumId: true,
    author: {
      select: userService.buildSmallSql!(),
    },
  };
};
const buildSql = (): IPostDetailedSelectSql => {
  return {
    id: true,
    title: true,
    content: true,
    forumId: true,
    author: {
      select: userService.buildSmallSql!(),
    },
    _count: {
      select: {
        comments: true,
      },
    },
    comments: {
      where: { parentId: null },
      select: {
        id: true,
        parentId: true,
        content: true,
        createdAt: true,
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

export const postService: IServiceConfig<
  IPost,
  IPostDto,
  IPostSelectSql,
  IPostSelectSql
> = {
  collectionName: "post",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmptyEntity: getEmptyPost,
};
