import { reportService } from "@/service/service/report.service";
import { useUser } from "../hooks/useUser";
import { IComment } from "@/service/models/comments.model";
import { IPost } from "@/service/models/post.model";
import ReportModel from "../components/Models/ReportModel";

interface Props {
  itemType: "post" | "comment";
  item: IPost | IComment;
  style: {
    btnStyle: string;
    textStyle: string;
  };
}

export default function NewReportWrapper({ itemType, item, style }: Props) {
  const user = useUser().getCurrentUserNoRender();
  if (!user) {
    return null;
  }

  const emptyReport = reportService.getEmpty();
  emptyReport.user = user;
  emptyReport[itemType] = item as IPost & IComment;
  return <ReportModel report={emptyReport} {...style} />;
}
