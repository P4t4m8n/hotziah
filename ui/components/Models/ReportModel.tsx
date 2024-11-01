import { apiClientService } from "@/service/client/api.client";
import { APIError } from "@/service/client/util/APIError";
import {
  ISelectSingleProps,
  ITtextAreaProps,
} from "@/service/models/app.model";
import { IReport } from "@/service/models/report.model";
import { reportService } from "@/service/service/report.service";
import { useModel } from "@/ui/hooks/useModel";
import { ReportSvg } from "@/ui/Icons/Svgs";
import { useRef, useState } from "react";
import SelectSingle from "../General/SelectSingle";
import TextArea from "../General/TextArea";
import Loader from "../General/Loader";

interface Props {
  report: IReport;
  btnStyle: string;
  textStyle: string;
}
export default function ReportModel({ report, btnStyle, textStyle }: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<"content" | "reason", string>>({
    content: "",
    reason: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const forData = new FormData(e.currentTarget);
      const reason = forData.get("reason") as string;
      const content = forData.get("content") as string;

      const reportDto = reportService.toDTO({ ...report, reason, content });
      if (report?.id) {
        await apiClientService.put(`report/${report.id}`, reportDto);
      } else {
        await apiClientService.post(`report`, reportDto);
      }
      setIsModelOpen(false);
    } catch (error) {
      if ((error as APIError).status === 422) {
        setErrors((error as APIError).response as Record<string, string>);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { reason, content } = report;
  const reasons = ["Spam", "Inappropriate", "Other"];

  const selectProps: ISelectSingleProps = {
    divStyle: "",
    labelStyle: "text-sm font-semibold py-1",
    inputStyle: "bg-platinum w-full p-1 rounded-lg",
    labelText: "Reason",
    name: "reason",
    value: reason,
    options: reasons,
  };

  const textAreaProps: ITtextAreaProps = {
    divStyle: "",
    labelStyle: "text-sm font-semibold py-1",
    inputStyle: "bg-platinum w-full p-1 rounded-lg",
    labelText: "Content",
    name: "content",
    value: content,
  };

  return (
    <li ref={modelRef} className=" relative">
      <div className="grid gap-1">
        <button
          className={btnStyle}
          onClick={() => setIsModelOpen((prev) => !prev)}
        >
          <ReportSvg />
        </button>
        <span className={textStyle}>Report</span>
      </div>
      {isModelOpen && (
        <form
          onSubmit={onSubmit}
          className="fixed top-[calc(50vh)] text-left translate-x-[calc(-50vw-7rem)] translate-y-[-50vh] bg-white w-96 h-fit shadow-model rounded-lg p-2 flex flex-col gap-2 model"
        >
          <header className="flex gap-2 border-b text-center">
            <button
              className="w-4 text-center text-sm font-bold"
              onClick={() => setIsModelOpen(false)}
            >
              X
            </button>
            <h1 className="w-full text-lg font-semibold ">File a Report</h1>
          </header>

          <SelectSingle selectProps={selectProps} error={errors.reason} />

          <TextArea textAreaProps={textAreaProps} error={errors.content} />

          <button
            disabled={isLoading}
            className="mt-auto self-center link"
            type="submit"
          >
            {isLoading ? <Loader /> : "Submit"}
          </button>
        </form>
      )}
    </li>
  );
}
