import { updateComment } from "@/service/server/comments.server";
import { decodeToken } from "@/service/server/util/decodeToken.util";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizeCommentFrom } from "@/service/server/util/sanitization.util";
import { validateCommentDto } from "@/service/validations/Comment.validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const   commentDto  = await req.json();
    console.log("commentDto:", commentDto);
    const { commentId } = await params;

    if (!commentDto) {
      const err = handleRouteError("Invalid comment", 400);
      return NextResponse.json(err.error, { status: +err.status });
    }

    if (commentId !== commentDto.id) {
      const err = handleRouteError("Invalid comment id", 400);
      return NextResponse.json(err.error, { status: +err.status });
    }

    const token = req.cookies.get("session")?.value;
    const { userId, userPermission } = await decodeToken(token);

    if (userId !== commentDto.authorId && userPermission !== "ADMIN") {
      const err = handleRouteError("Unauthorized", 401);
      return NextResponse.json(err.error, { status: +err.status });
    }

    const dto = sanitizeCommentFrom(commentDto);

    const errors = validateCommentDto(dto);
    if (errors.content) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }

    const updatedComment = await updateComment(dto);

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
