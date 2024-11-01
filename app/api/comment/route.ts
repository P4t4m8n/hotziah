import { getSessionUser } from "@/service/server/auth.server";
import { createComment } from "@/service/server/comments.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizeCommentFrom } from "@/service/server/util/sanitization.util";
import { validateCommentDto } from "@/service/validations/Comment.validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { comment } = await req.json();
    const user = await getSessionUser();

    if (!user) {
      const err = handleRouteError("User not authenticated", 401);
      return NextResponse.json(err.error, { status: +err.status });
    }

    if (!comment) {
      const err = handleRouteError("Comment data is required", 400);
      return NextResponse.json(err.error, { status: +err.status });
    }

    const dto = sanitizeCommentFrom(comment);
    dto.authorId = user.id!;

    const errors = validateCommentDto(dto);
    if (errors.content) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }

    const newComment = await createComment(dto);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
