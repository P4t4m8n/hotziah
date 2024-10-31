import { getQuestionnaireById } from "@/service/server/questionnaire.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ questionnaireId: string }> }
) {
  try {
    const { questionnaireId } = await params;
    const questionnaires = await getQuestionnaireById(questionnaireId);
    console.dir(questionnaires, { depth: null });
    return NextResponse.json(questionnaires, { status: 200 });
  } catch (error) {
    const err = handleRouteError(" Error  ", 500, error);
    throw err;
  }
}
