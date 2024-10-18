import { prisma } from "@/prisma/prismaClient";
import {
  IForum,
  IForumDto,
  IForumFilter,
  IForumSelectSql,
} from "../models/forum.model";
import { handleError } from "../util/error.util";
import { userService } from "./user.server";
import { IServiceConfig } from "../models/db.model";
import { ForumSubject, ForumType } from "@prisma/client";
import { IPost } from "../models/post.model";

export const saveForum = async (formData: FormData): Promise<void> => {
  const forumToSave: IForumDto = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as ForumType,
    subjects: formData.getAll("subjects") as ForumSubject[],
    admins: formData.getAll("admins") as string[],
  };

  if (forumToSave.id) {
    await forumServer.update(forumToSave);
  } else {
    await forumServer.create(forumToSave);
  }
};

const query = async (filter: IForumFilter): Promise<IForum[]> => {
  try {
    const forumsData = await prisma.forum.findMany({
      where: {
        id: filter.id,
        title: { contains: filter.title },
        subjects: filter.subject ? { hasSome: filter.subject } : undefined,
        type: { equals: filter.type },
      },
      select: forumService.buildSql(),
      take: filter.take,
      skip: filter.skip,
    });
    if (!forumsData) throw new Error("No forums found");

    const forums: IForum[] = forumsData.map((forum) => {
      return {
        ...forum,
        numOfPosts: forum._count.posts,
      };
    });

    return forums;
  } catch (error) {
    throw handleError(error, "Error querying forums in forum.server.ts");
  }
};

const get = async (id: string): Promise<IForum> => {
  try {
    const forum = await prisma.forum.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        admins: {
          select: userService.buildSmallSql!(),
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
                  select: userService.buildSmallSql!(),
                },
                content: true,
                createdAt: true,
                id: true,
              },
              take: 1,
            },
          },
        },
      },
    });
    if (!forum) throw new Error("Forum not found");

    const posts = forum.posts.map((post) => {
      const _post: IPost = {
        ...post,
        numOfComments: post._count.comments||0,
      };
      return _post;
    });

    return { ...forum, posts };
  } catch (error) {
    throw handleError(error, "Error in getForum service");
  }
};

const create = async (forumDto: IForumDto): Promise<IForum> => {
  try {
    const newForum = await prisma.forum.create({
      data: {
        title: forumDto.title,
        description: forumDto.description,
        type: forumDto.type,
        subjects: forumDto.subjects,
        admins: {
          connect: forumDto.admins.map((adminId) => ({ id: adminId })),
        },
      },
      select: forumService.buildSql(),
    });

    return newForum;
  } catch (error) {
    throw handleError(error, "Error in createForum service");
  }
};

const update = async (forum: IForumDto): Promise<IForum> => {
  try {
    const updatedForum = await prisma.forum.update({
      where: { id: forum.id },
      data: {
        title: forum.title,
        description: forum.description,
        type: forum.type,
        subjects: forum.subjects,
      },
      select: forumService.buildSql(),
    });

    return updatedForum;
  } catch (error) {
    throw handleError(error, "Error in updateForum service");
  }
};

const remove = async (id: string): Promise<boolean> => {
  try {
    await prisma.forum.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw handleError(error, "Error in removeForum service");
  }
};

const toDTO = (forum: IForum): IForumDto => {
  const { admins, ...rest } = forum;
  return {
    ...rest,

    admins: admins.map((admin) => admin.id!),
  };
};

const getEmptyForum = (): IForum => {
  return {
    title: "",
    description: "",
    type: "PUBLIC",
    admins: [],
    subjects: ["GENERAL"],
    posts: [],
  };
};

const buildSql = (): IForumSelectSql => {
  return {
    _count: {
      select: {
        posts: true,
      },
    },
    id: true,
    description: true,
    admins: {
      select: userService.buildSmallSql!(),
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
              select: userService.buildSmallSql!(),
            },
            content: true,
            createdAt: true,
            id: true,
          },
          take: 1,
        },
      },
      take: 1,
    },
  };
};

export const forumService: IServiceConfig<
  IForum,
  IForumDto,
  IForumSelectSql,
  IForumSelectSql
> = {
  collectionName: "forum",
  toDTO,
  buildSql,
  getEmptyEntity: getEmptyForum,
};

export const forumServer = {
  query,
  get,
  create,
  update,
  remove,
};
