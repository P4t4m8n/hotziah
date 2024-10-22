import {
  IForum,
  IForumDto,
  IForumSelectSql,
  IForumSmallSelectSql,
} from "../models/forum.model";
import { userService } from "./user.service";

const toDTO = (forum: IForum): IForumDto => {
  const { admins, ...rest } = forum;
  return {
    ...rest,

    admins: admins.map((admin) => admin.id!),
  };
};

const getEmpty = (): IForum => {
  return {
    title: "",
    description: "",
    type: "PUBLIC",
    admins: [],
    subjects: ["GENERAL"],
    posts: [],
  };
};

const buildSmallSql = (): IForumSmallSelectSql => {
  return {
    _count: {
      select: {
        posts: true,
      },
    },
    id: true,
    description: true,
    admins: {
      select: userService.buildSmallSql(),
    },
    type: true,
    subjects: true,
    title: true,
    posts: {
      select: {
        id: true,
        title: true,
        content: true,
        forumId: true,
        author: {
          select: {
            id: true,
            username: true,
            imgUrl: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            author: {
              select: userService.buildSmallSql(),
            },
            content: true,
            createdAt: true,
            id: true,
            postId: true,
          },
          take: 1,
        },
      },
      take: 1,
    },
  };
};

const buildSql = (): IForumSelectSql => {
  return {
    id: true,
    description: true,
    admins: {
      select: userService.buildSmallSql(),
    },
    type: true,
    subjects: true,
    title: true,
    posts: {
      select: {
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
          orderBy: {
            createdAt: "desc",
          },
          select: {
            author: {
              select: userService.buildSmallSql(),
            },
            content: true,
            createdAt: true,
            id: true,
            postId: true,
          },
          take: 1,
        },
      },
    },
  };
};

export const forumService = {
  collectionName: "forum",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmpty,
};
