import { IEntity } from "./app.model";
import { IUserSmall } from "./user.model";

interface ILikeBase extends IEntity {
  postId?: string | null;
  commentId?: string | null;
  articleId?: string | null;
}

export interface ILike extends ILikeBase {
  user: IUserSmall;
}

export interface ILikeDto extends ILikeBase {
  userId: string;
  createdAt?: Date | string;
}
