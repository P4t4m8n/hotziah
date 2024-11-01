import { prisma } from "@/prisma/prismaClient";
import { IReport, IReportDto } from "../models/report.model";
import { userService } from "../service/user.service";
import { postService } from "../service/post.service";
import { commentService } from "../service/comment.service";
import { handleError } from "./util/error.util";

export const getReports = async (): Promise<IReport[]> => {
  try {
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        reason: true,
        content: true,
        createdAt: true,
        status: true,
        user: { select: userService.buildSmallSql() },
        reportedUser: { select: userService.buildSmallSql() },
        post: { select: postService.buildSql() },
        comment: { select: commentService.buildSmallSql() },
      },
    });

    return reports;
  } catch (error) {
    throw handleError(error, "Error querying reports in report.server.ts");
  }
};

export const saveReport = async (reportDto: IReportDto): Promise<IReport> => {
  try {
    const report = await prisma.report.upsert({
      update: { ...reportDto },
      create: { ...reportDto },
      where: { id: reportDto?.id||"" },
      select: {
        id: true,
        reason: true,
        content: true,
        createdAt: true,
        status: true,
        user: { select: userService.buildSmallSql() },
        reportedUser: { select: userService.buildSmallSql() },
        post: { select: postService.buildSql() },
        comment: { select: commentService.buildSmallSql() },
      },
    });

    return report;
  } catch (error) {
    throw handleError(error, "Error saving report in report.server.ts");
  }
};
