import { IEntity } from "./app.model";
import { IComment } from "./comments.model";
import { ISelectSql } from "./db.model";
import { ILike } from "./like.model";
import { IUserSmall, IUserSmallSelectSql } from "./user.model";

interface IPostBase extends IEntity {
  title: string;
  content: string;
  forumId: string;
  tags: string[];
  isPinned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IPost extends IPostBase {
  author: IUserSmall;
  comments?: IComment[];
  _count?: { comments?: number; likes?: number };
  likes?: ILike[];
}

export interface IPostDto extends IPostBase {
  createdAt?: Date;
  updatedAt?: Date;
  authorId: string;
}
export interface IPostFilter extends IEntity {
  title?: string;
  forumTitle?: string;
  authorName?: string;
  page?: number;
  limit?: number;
}

export interface IPostSmallSelectSql extends ISelectSql {
  id: boolean;
  title: boolean;
  content: boolean;
  forumId: boolean;
  tags: boolean;
  isPinned: boolean;
  createdAt: boolean,
  updatedAt: boolean,
  author: {
    select: IUserSmallSelectSql;
  };
}
export interface IPostSelectSql extends IPostSmallSelectSql {
  _count: {
    select: {
      comments: boolean;
      likes: boolean;
    };
  };

  comments: {
    where: { parentId: string | null };
    select: {
      id: boolean;
      parentId: boolean;
      content: boolean;
      createdAt: boolean;
      postId: boolean;
      author: {
        select: {
          id: boolean;
          username: boolean;
          imgUrl: boolean;
        };
      };
      _count: {
        select: {
          replies: boolean;
          likes: boolean;
        };
      };
    };
  };
}
