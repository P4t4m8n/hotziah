import { saveReport } from "@/service/server/report.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizeReportForm } from "@/service/server/util/sanitization.util";
import { validateReportDto } from "@/service/validations/report.validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const dto = sanitizeReportForm(data);

    const errors = validateReportDto(dto);
    if (Object.values(errors).some((error) => error)) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }

    const report = await saveReport(dto);

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to save report", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
