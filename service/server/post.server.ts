"use server";

import { prisma } from "@/prisma/prismaClient";
import { IPost, IPostFilter } from "../models/post.model";
import { handleError } from "../util/error.util";
import { userService } from "./user.server";
import { postService } from "../service/post.service";

export const getPosts = async (filter: IPostFilter): Promise<IPost[]> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        id: filter.id,
        title: { contains: filter.title },
        forum: {
          title: { contains: filter.forumTitle },
        },
        author: {
          OR: [
            { username: { contains: filter.authorName } },
            { firstName: { contains: filter.authorName } },
            { lastName: { contains: filter.authorName } },
          ],
        },
      },
      select: postService.buildSmallSql!(),
      take: filter.limit,
      skip: filter.page,
    });

    return posts;
  } catch (error) {
    throw handleError(error, "Error querying posts in post.server.ts");
  }
};

export const getPostBtId = async (id: string): Promise<IPost> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
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
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw handleError(error, "Error getting post in post.server.ts");
  }
};

export const createPost = async (post: IPost): Promise<IPost> => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        forumId: post.forumId,
        authorId: post.author.id!,
      },
      select: postService.buildSql(),
    });

    return newPost;
  } catch (error) {
    throw handleError(error, "Error creating post in post.server.ts");
  }
};

export const updatePost = async (post: IPost): Promise<IPost> => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
      },
      select: postService.buildSql(),
    });

    return updatedPost;
  } catch (error) {
    throw handleError(error, "Error updating post in post.server.ts");
  }
};

export const removePost = async (id: string): Promise<IPost> => {
  try {
    const post = await prisma.post.delete({
      where: { id },
      select: postService.buildSql(),
    });

    return post;
  } catch (error) {
    throw handleError(error, "Error deleting post in post.server.ts");
  }
};
