import { IEntity } from "./app.model";
import { ISelectSql } from "./db.model";
import { IUserSmall, IUserSmallSelectSql } from "./user.model";

interface ICommentBase extends IEntity {
  content: string;
  createdAt: Date;
  postId: string;
  parentId?: string | null;
}

export interface IComment extends ICommentBase {
  author: IUserSmall;
  replies?: IComment[];
  _count?: { replies?: number};
}

export interface ICommentDto extends ICommentBase {
  authorId: string;
}

export interface ICommentFilter extends IEntity {
  parentId?: string;
  postTitle?: string;
  parentTitle?: string;
  authorName?: string;
}

export interface ICommentSmallSelectSql extends ISelectSql {
  id: boolean;
  content: boolean;
  createdAt: boolean;
  parentId: boolean;
  postId: boolean;
  author: {
    select: IUserSmallSelectSql;
  };
  _count: {
    select: {
      replies: boolean;
    };
  };
}
export interface ICommentSelectSql extends ISelectSql {
  id: boolean;
  content: boolean;
  createdAt: boolean;
  parentId: boolean;
  postId: boolean;

  author: {
    select: IUserSmallSelectSql;
  };
  replies: {
    where: {
      parentId: string|null;
    };
    select: ICommentSmallSelectSql;
  };
}
