import { IEntity } from "./app.model";
import { ISelectSql } from "./db.model";
import { ILike } from "./like.model";
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
  _count?: { comments?: number; likes?: number };
  likes?: ILike[];
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
    select: {
      imgUrl: boolean;
      username: boolean;
      id: boolean;
    };
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
      parentId: string;
    };
    select: ICommentSmallSelectSql;
  };
}
