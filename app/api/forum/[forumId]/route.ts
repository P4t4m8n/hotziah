import { IForumDto } from "@/service/models/forum.model";
import { saveForum, updateForum } from "@/service/server/forum.server";
import { sanitizeForumForm } from "@/service/server/util/sanitization.util";
import { validateForumDto } from "@/service/validations/forum.validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ forumId: string }> }
) {
  try {
    const formData = await req.formData();

    const forumToSave: IForumDto = sanitizeForumForm(formData);
    
    forumToSave.id = (await params).forumId;
    if (!forumToSave.id) {
      return NextResponse.json(
        { error: "Forum ID is required" },
        {
          status: 401,
        }
      );
    }

    const errors = validateForumDto(forumToSave);

    if (errors.title || errors.description || errors.type || errors.admins) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }

    const forum = await updateForum(forumToSave);
    console.log("forum:", forum);

    return NextResponse.json(forum, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
