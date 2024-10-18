import { IEntity } from "./app.model";
import { IUserSmall } from "./user.model";

interface ICommentBase extends IEntity {
  content: string;
  createdAt: Date;
}

export interface IComment extends ICommentBase {
  author: IUserSmall;
  comments?: IComment[];
  _count?: { replies: number };
}

export interface ICommentDto extends ICommentBase {
  postId: string;
  parentId?: string;
  authorId: string;
}

export interface ICommentFilter extends IEntity {
  parentId?: string;
  postTitle?: string;
  parentTitle?: string;
  authorName?: string;
}
