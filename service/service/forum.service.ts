import {
  IForum,
  IForumDto,
  IForumSelectSql,
  IForumSmallSelectSql,
} from "../models/forum.model";
import { postService } from "./post.service";
import { userService } from "./user.service";
/**
 * Converts a forum object to a forum DTO object by extracting admins' IDs.
 *
 * @param forum - The forum object to convert to a DTO.
 * @returns The forum DTO object with admins' IDs instead of full admin objects.
 */
const toDTO = (forum: IForum): IForumDto => {
  if (!forum || !Array.isArray(forum.admins)) {
    throw new Error("Invalid forum object. Expected structure not met.");
  }
  const { admins, ...rest } = forum;
  return {
    ...rest,
    admins: admins ? admins.map((admin) => admin.id!) : [],
  };
};
/**
 * Returns an empty forum object with default values for title, description, type, admins, subjects, and posts.
 * The default values are:
 * - title: ""
 * - description: ""
 * - type: "PUBLIC"
 * - admins: an empty array
 * - subjects: an array with "GENERAL"
 * - posts: an empty array
 */
const getEmpty = (): IForum => ({
  title: "",
  description: "",
  type: "PUBLIC",
  admins: [],
  subjects: ["GENERAL"],
  posts: [],
});
/**
 * Builds a small SQL query object for selecting forum data with limited fields and ordering by pinned posts and creation date.
 * @returns {IForumSmallSelectSql} The small SQL query object for forum selection.
 */
const buildSmallSql = (): IForumSmallSelectSql => {
  const sqlResult = buildSql();
  return {
    ...sqlResult,
    posts: {
      select: sqlResult.posts.select,
      take: 1,
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    },
    _count: {
      select: {
        posts: true,
        uniqueView: true,
      },
    },
  };
};
/**
 * Builds and returns the SQL query structure for selecting forum data including id, description, type, subjects, title, admins, and posts.
 * The query includes specific selections for admins and posts, with additional details such as comments count, unique views, and post comments.
 * Orders the posts by 'isPinned' and 'createdAt' in descending order.
 * Utilizes internal organization modules for user and post services to construct the SQL query.
 * @returns The SQL query structure for selecting forum data.
 */
const buildSql = (): IForumSelectSql => ({
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
      ...postService.buildSmallSql(),
      _count: {
        select: {
          comments: true,
          uniqueView: true,
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
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  },
});
/**
 * The forum service object that includes the collection name, DTO conversion function, and SQL query construction functions.
 */
export const forumService = {
  collectionName: "forum",
  toDTO,
  buildSql,
  buildSmallSql,
  getEmpty,
};
