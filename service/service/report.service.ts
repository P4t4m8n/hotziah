import { IReport, IReportDto } from "../models/report.model";
import { userService } from "./user.service";

const toDTO = (report: IReport): IReportDto => {
  const { status, reason, content, id, user, post, comment, reportedUser } =
    report;

  const dto: IReportDto = {
    userId: user.id!,
    reason,
    content,
    status,
  };
  if (id) dto.id = id;
  if (post) dto.postId = post.id;
  if (comment) dto.commentId = comment.id;
  if (reportedUser) dto.reportedUserId = reportedUser.id;

  return dto;
};

const getEmpty = (): IReport => {
  return {
    content: "",
    reason: "",
    status: "PENDING",
    user: userService.getEmptyUser(),
  };
};

export const reportService = {
  toDTO,
  getEmpty,
};
