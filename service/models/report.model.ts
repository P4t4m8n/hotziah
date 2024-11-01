import { ReportStatus } from "@prisma/client";
import { IEntity } from "./app.model";
import { IComment } from "./comments.model";
import { IPost } from "./post.model";
import { IUserSmall } from "./user.model";

interface IReportBase extends IEntity {
  reason: string;
  content: string;
  createdAt?: Date | string;
  status: ReportStatus;
}

export interface IReport extends IReportBase {
  user: IUserSmall;
  post?: IPost | null;
  comment?: IComment | null;
  reportedUser?: IUserSmall | null;
}
export interface IReportDto extends IReportBase {
  userId: string;
  postId?: string;
  commentId?: string;
  articleId?: string;
  reportedUserId?: string;
}

export interface IReportFilter extends IEntity {
  userId?: string;
  postId?: string;
  commentId?: string;
  articleId?: string;
  reportedUserId?: string;
  reason?: string;
  userName?: string;
  reportedUserName?: string;
  postTitle?: string;
  articleTitle?: string;
  createdAt?: Date | string;
  take?: number;
  skip?: number;
}
