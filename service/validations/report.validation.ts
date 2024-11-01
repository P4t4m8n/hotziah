import { IReportDto } from "../models/report.model";
import { validationService } from "./util.validation";

export const validateReportDto = (
  reportDto: IReportDto
): Record<string, string> => {
  const errors: Record<string, string> = {
    reason:
      validationService.validateLength(reportDto.reason || "", 2, "Reason") ||
      "",
    content:
      validationService.validateLength(reportDto.content || "", 1, "Content") ||
      "",
    userId:
      validationService.validateExistence(reportDto.userId, "User ID") || "",
    status:
      validationService.validateExistence(reportDto.status, "Status") || "",
  };

  if (
    !reportDto.reportedUserId &&
    !reportDto.postId &&
    !reportDto.commentId &&
    !reportDto.articleId
  )
    errors.item = "Reported item ID is required";

  return errors;
};
