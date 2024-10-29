import { IUserSmall, IUserSmallSelectSql } from "./user.model";
import { IPost, IPostSmallSelectSql } from "./post.model";
import { IEntity } from "./app.model";
import { ISelectSql } from "./db.model";

interface IForumBase extends IEntity {
  title: string;
  description: string;
  type: string;
  subjects: string[];
  createdAt?: Date;
}
export interface IForum extends IForumBase {
  admins: IUserSmall[];
  posts: IPost[];
  _count?: { posts: number; uniqueView: number };
}
export interface IForumDto extends IForumBase {
  admins: string[];
  updatedAt?: Date;
}
export interface IForumFilter extends IEntity {
  title?: string;
  postName?: string;
  type?: string;
  subject?: string[];
  take?: number;
  skip?: number;
  uniqueView?: number;
  sortBy?: "createdAt" | "updatedAt" | "uniqueView" | "asc" | "desc";
}
export interface IForumSmallSelectSql extends ISelectSql {
  description: boolean;
  type: boolean;
  subjects: boolean;
  title: boolean;
  admins: {
    select: IUserSmallSelectSql;
  };
  _count: {
    select: {
      posts: boolean;
      uniqueView: boolean;
    };
  };
  posts: {
    select: IPostSmallSelectSql & {
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
  description: boolean;
  type: boolean;
  subjects: boolean;
  title: boolean;
  admins: {
    select: IUserSmallSelectSql;
  };
  posts: {
    select: IPostSmallSelectSql & {
      _count: {
        select: {
          comments: boolean;
          uniqueView: true;
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
