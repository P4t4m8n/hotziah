import { IForumDto } from "@/service/models/forum.model";
import { saveForum } from "@/service/server/forum.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizeForumForm } from "@/service/server/util/sanitization.util";
import { validateForumDto } from "@/service/validations/forum.validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("********************")
    const formData = await req.formData();
    console.log("_formData:", formData)

    const forumToSave: IForumDto = sanitizeForumForm(formData);

    const errors = validateForumDto(forumToSave);

    if (errors.length) {
      const err = handleRouteError(`${errors}`, 400, errors);
      return NextResponse.json({ err });
    }

    const forum = await saveForum(forumToSave);

    return NextResponse.json(forum, { status: 201 });
  } catch (error) {
    const err = handleRouteError("", 500, error);
    return NextResponse.json({ ...err });
  }
}
