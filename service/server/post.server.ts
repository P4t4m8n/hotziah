"use server";

import { prisma } from "@/prisma/prismaClient";
import { IPost, IPostDto, IPostFilter } from "../models/post.model";
import { handleError } from "./util/error.util";
import { postService } from "../service/post.service";
import { Permission } from "@prisma/client";
import { IComment } from "../models/comments.model";

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
export const getPostById = async (id: string): Promise<IPost> => {
  try {
    const postWithComments: IQueryResultRow[] = await prisma.$queryRaw`
    WITH RECURSIVE comment_tree AS (
      -- Start with top-level comments for the specified post
      SELECT 
        c.id AS comment_id,
        c."isPinned" AS comment_isPinned,
        c.content AS comment_content,
        c."createdAt" AS comment_createdAt,
        c."postId" AS comment_postId,
        c."parentId" AS comment_parentId,
        c."authorId" AS comment_authorId,
        u.id AS author_userId,
        u.username AS author_username,
        u."imgUrl" AS author_imgUrl,
        u.permission AS author_permission,
        u."therapistType" AS author_therapistType,
        1 AS depth -- Initial depth level
      FROM "Comment" c
      JOIN "User" u ON c."authorId" = u.id
      WHERE c."postId" = ${id} AND c."parentId" IS NULL

      UNION ALL

      -- Recursively fetch nested comments
      SELECT 
        c.id AS comment_id,
        c."isPinned" AS comment_isPinned,
        c.content AS comment_content,
        c."createdAt" AS comment_createdAt,
        c."postId" AS comment_postId,
        c."parentId" AS comment_parentId,
        c."authorId" AS comment_authorId,
        u.id AS author_userId,
        u.username AS author_username,
        u."imgUrl" AS author_imgUrl,
        u.permission AS author_permission,
        u."therapistType" AS author_therapistType,
        ct.depth + 1 AS depth
      FROM "Comment" c
      JOIN "User" u ON c."authorId" = u.id
      INNER JOIN comment_tree ct ON c."parentId" = ct.comment_id
    )

    -- Fetch the post with all comments from the CTE
    SELECT 
      p.id AS post_id,
      p.title AS post_title,
      p.content AS post_content,
      p."createdAt" AS post_createdAt,
      p."updatedAt" AS post_updatedAt,
      p."isPinned" AS post_isPinned,
      p."forumId" as post_forumId,
      p.tags AS post_tags,
      postUser.id AS post_authorId,
      postUser.username AS post_authorUsername,
      postUser."imgUrl" AS post_authorImgUrl,
      postUser.permission AS post_authorPermission,
      postUser."therapistType" AS post_authorTherapistType,
      ct.comment_id,
      ct.comment_content,
      ct.comment_createdAt,
      ct.comment_isPinned,
      ct.comment_parentId,
      ct.depth AS comment_depth,
      ct.author_userId AS comment_authorId,
      ct.author_username AS comment_authorUsername,
      ct.author_imgUrl AS comment_authorImgUrl,
      ct.author_permission AS comment_authorPermission,
      ct.author_therapistType AS comment_authorTherapistType
    FROM "Post" p
    JOIN "User" postUser ON p."authorId" = postUser.id
    LEFT JOIN comment_tree ct ON p.id = ct.comment_postId
    WHERE p.id = ${id}
    ORDER BY comment_depth, comment_createdAt;
  `;

    return formatPostWithComments(postWithComments);
  } catch (error) {
    throw handleError(
      error,
      "Error fetching post with comments in recursive SQL query."
    );
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

const formatPostWithComments = (data: IQueryResultRow[]): IPost => {
  if (data.length === 0) {
    throw new Error("No data found for the specified post.");
  }

  // Extract post data from the first row
  const post: IPost = {
    id: data[0].post_id,
    title: data[0].post_title,
    content: data[0].post_content,
    forumId: "", // Set `forumId` if available in the query result
    tags: data[0].post_tags || [],
    isPinned: data[0].post_ispinned,
    createdAt: data[0].post_createdat,
    updatedAt: data[0].post_updatedat,
    author: {
      id: data[0].post_authorid,
      username: data[0].post_authorusername,
      imgUrl: data[0].post_authorimgurl,
      permission: data[0].post_authorpermission,
      therapistType: data[0].post_authortherapisttype,
    },
    comments: [],
  };

  // Map to organize comments by id for nesting
  const commentsMap = new Map<string, IComment>();

  // Populate the comments map with each comment
  data.forEach((row) => {
    if (row.comment_id) {
      const comment: IComment = {
        id: row.comment_id,
        content: row.comment_content || "",
        createdAt: row.comment_createdat || new Date(),
        postId: row.post_id,
        parentId: row.comment_parentid || null,
        author: {
          id: row.comment_authorid!,
          username: row.comment_authorusername || "",
          imgUrl: row.comment_authorimgurl || "",
          permission: row.comment_authorpermission,
          therapistType: row.comment_authortherapisttype,
        },
        replies: [],
      };
      commentsMap.set(comment.id!, comment);
    }
  });

  // Nest replies under their respective parent comments
  commentsMap.forEach((comment) => {
    if (comment.parentId) {
      const parentComment = commentsMap.get(comment.parentId);
      if (parentComment) {
        parentComment?.replies?.push(comment);
      }
    } else {
      post?.comments?.push(comment); // Add top-level comments to the post
    }
  });

  return post;
};

interface IQueryResultRow {
  post_id: string;
  post_title: string;
  post_content: string;
  post_createdat: Date;
  post_updatedat: Date;
  post_ispinned: boolean;
  post_tags: string[];
  post_authorid: string;
  post_authorusername: string;
  post_authorimgurl: string;
  post_authorpermission?: Permission;
  post_authortherapisttype?: string | null;

  comment_id?: string;
  comment_content?: string;
  comment_createdat?: Date;
  comment_ispinned?: boolean;
  comment_parentid?: string;
  comment_depth?: number;
  comment_authorid?: string;
  comment_authorusername?: string;
  comment_authorimgurl?: string;
  comment_authorpermission?: Permission;
  comment_authortherapisttype?: string | null;
}
