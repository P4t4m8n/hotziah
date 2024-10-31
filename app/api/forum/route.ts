import { IForumDto } from "@/service/models/forum.model";
import { saveForum } from "@/service/server/forum.server";
import { sanitizeForumForm } from "@/service/server/util/sanitization.util";
import { validateForumDto } from "@/service/validations/forum.validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const forumToSave: IForumDto = sanitizeForumForm(formData);

    const errors = validateForumDto(forumToSave);

    if (errors.title || errors.description || errors.type || errors.admins) {
      return NextResponse.json(errors,{
        status: 422 ,
      
      });
    }

    const forum = await saveForum(forumToSave);

    return NextResponse.json(forum, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
