import { IServiceConfig } from "../models/db.model";
import { IPost, IPostDto, IPostSelectSql } from "../models/post.model";
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

const buildSql = (): IPostSelectSql => {
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

export const postService: IServiceConfig<
  IPost,
  IPostDto,
  IPostSelectSql,
  IPostSelectSql
> = {
  collectionName: "post",
  toDTO,
  buildSql,
  getEmptyEntity: getEmptyPost,
};
