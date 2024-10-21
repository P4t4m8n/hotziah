import { IUserSmall, IUserSmallSelectSql } from "./user.model";
import { IPost } from "./post.model";
import { IEntity } from "./app.model";
import { ForumSubject, ForumType } from "@prisma/client";
import { ISelectSql } from "./db.model";

interface IForumBase extends IEntity {
  title: string;
  description: string;
  type: ForumType;
  subjects: ForumSubject[];
  createdAt?: Date;
}

export interface IForum extends IForumBase {
  admins: IUserSmall[];
  posts: IPost[];
  _count?: { posts: number }; //include in case only fetching forums for preview instead of fetching all the threads
}

export interface IForumDto extends IForumBase {
  admins: string[];
  updatedAt?: Date;
}

export interface IForumFilter extends IEntity {
  title?: string;
  postName?: string;
  type?: ForumType;
  subject?: ForumSubject[];
  take?: number;
  skip?: number;
}

export interface IForumSmallSelectSql extends ISelectSql {
  _count: {
    select: {
      posts: boolean;
    };
  };
  description: boolean;
  admins: {
    select: IUserSmallSelectSql;
  };
  type: boolean;
  subjects: boolean;
  title: boolean;
  posts: {
    select: {
      id: boolean;
      title: boolean;
      content: boolean;
      forumId: boolean;
      author: {
        select: IUserSmallSelectSql;
      };
      comments: {
        orderBy: {
          createdAt: "desc";
        };
        select: {
          author: {
            select: IUserSmallSelectSql;
          };
          content: boolean;
          createdAt: boolean;
          id: boolean;
          postId: boolean;
        };
        take: 1;
      };
    };
    take: 1;
  };
}
export interface IForumSelectSql extends ISelectSql {
  id: boolean;
  description: boolean;
  admins: {
    select: IUserSmallSelectSql;
  };
  type: boolean;
  subjects: boolean;
  title: boolean;
  posts: {
    select: {
      id: boolean;
      title: boolean;
      content: boolean;
      forumId: boolean;
      author: {
        select: {
          id: boolean;
          username: boolean;
          imgUrl: boolean;
        };
      };
      _count: {
        select: {
          comments: boolean;
        };
      };
      comments: {
        orderBy: {
          createdAt: "desc";
        };
        select: {
          author: {
            select: IUserSmallSelectSql;
          };
          content: boolean;
          createdAt: boolean;
          id: boolean;
          postId: boolean;
        };
        take: 1;
      };
    };
  };
}

export const FORUM_TYPE: ForumType[] = Object.values(ForumType);
export const FORUM_SUBJECTS: ForumSubject[] = Object.values(ForumSubject);
