import { IEntity } from "./app.model";
import { IComment } from "./comments.model";
import { ISelectSql } from "./db.model";
import { IUserSmall, IUserSmallSelectSql } from "./user.model";

interface IPostBase extends IEntity {
  title: string;
  content: string;
  forumId: string;
}
export interface IPost extends IPostBase {
  author: IUserSmall;
  comments?: IComment[];
  _count?: { comments: number };
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

export interface IPostSelectSql extends ISelectSql {
  id: boolean;
  title: boolean;
  content: boolean;
  forumId: boolean;
  author: {
    select: IUserSmallSelectSql;
  };
}
export interface IPostDetailedSelectSql extends IPostSelectSql {
  _count: {
    select: {
      comments: boolean;
    };
  };

  comments:{}
}
