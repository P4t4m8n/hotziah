"use server";

import { prisma } from "@/prisma/prismaClient";
import { IPost, IPostDto, IPostFilter } from "../models/post.model";
import { handleError } from "./util/error.util";
import { postService } from "../service/post.service";
import { userService } from "../service/user.service";

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

export const getPostBtId = async (
  id: string,
  userId?: string
): Promise<IPost> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
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
            likes: true,
          },
        },
        likes: {
          where: { userId: userId || "" },
          select: {
            id: true,
            userId: true,
            postId: true,
            createdAt: true,
            articleId: true,
            user: {
              select: userService.buildSmallSql(),
            },
          },
        },
        comments: {
          where: { parentId: null },
          select: {
            id: true,
            parentId: true,
            content: true,
            createdAt: true,
            postId: true,
            likes: {
              where: { userId: userId || "" },
              select: {
                id: true,
                userId: true,
                commentId: true,
                createdAt: true,
                user: {
                  select: userService.buildSmallSql(),
                },
              },
            },
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
                likes: true,
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

export const savePost = async (post: IPost): Promise<IPost> => {
  const dto = postService.toDTO(post);
  if (post.id) {
    return await updatePost(dto);
  } else {
    return await createPost(dto);
  }
};

export const createPost = async (post: IPostDto): Promise<IPost> => {
  //TODO: add the likes and comments likes as empty array instead of the DB query
  try {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        forumId: post.forumId,
        authorId: post.authorId,
      },
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
            likes: true,
          },
        },
        comments: {
          select: {
            id: true,
            parentId: true,
            content: true,
            createdAt: true,
            postId: true,
            likes: {
              where: { userId: "" },
              select: {
                id: true,
                userId: true,
                postId: true,
                createdAt: true,
                articleId: true,
                user: {
                  select: userService.buildSmallSql(),
                },
              },
            },
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
                likes: true,
              },
            },
          },
        },
      },
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
      },
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
            likes: true,
          },
        },
        comments: {
          select: {
            id: true,
            parentId: true,
            content: true,
            createdAt: true,
            postId: true,
            likes: {
              where: { userId: "" },
              select: {
                id: true,
                userId: true,
                postId: true,
                createdAt: true,
                articleId: true,
                user: {
                  select: userService.buildSmallSql(),
                },
              },
            },
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
                likes: true,
              },
            },
          },
        },
      },
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
