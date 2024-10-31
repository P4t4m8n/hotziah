import { IQuestionnaireDto } from "@/service/models/questionnaire.model";
import { createQuestionnaire } from "@/service/server/questionnaire.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const dto: IQuestionnaireDto = await req.json();
    if (!dto) {
      const err = handleRouteError("Invalid data", 400);
      throw err;
    }
    const questionnaire = await createQuestionnaire(dto);
    return NextResponse.json(questionnaire, { status: 201 });
  } catch (error) {
    const err = handleRouteError(" Error  ", 500, error);
    throw err;
  }
}
