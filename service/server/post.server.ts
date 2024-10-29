"use server";

import { prisma } from "@/prisma/prismaClient";
import { IPost, IPostDto, IPostFilter } from "../models/post.model";
import { handleError } from "./util/error.util";
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
      select: postService.buildSmallSql(),
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
      select: postService.buildSql(),
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw handleError(error, "Error getting post in post.server.ts");
  }
};

export const createPost = async (post: IPostDto): Promise<IPost> => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        forumId: post.forumId,
        authorId: post.authorId,
        tags: post.tags,
        isPinned: post.isPinned || false,
      },
      select: postService.buildSql(),
    });

    return newPost;
  } catch (error) {
    throw handleError(error, "Error creating post in post.server.ts");
  }
};

export const updatePost = async (post: IPostDto): Promise<IPost> => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
        tags: post.tags,
      },
      select: postService.buildSql(),
    });

    return updatedPost;
  } catch (error) {
    throw handleError(error, "Error updating post in post.server.ts");
  }
};

export const removePost = async (id: string): Promise<boolean> => {
  try {
    await prisma.post.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw handleError(error, "Error deleting post in post.server.ts");
  }
};

export const togglePinned = async (
  id: string,
  isPinned: boolean
): Promise<void> => {
  try {
    await prisma.post.update({
      where: { id },
      data: { isPinned },
      select: postService.buildSql(),
    });
  } catch (error) {
    throw handleError(error, "Error toggling pinned in post.server.ts");
  }
};
