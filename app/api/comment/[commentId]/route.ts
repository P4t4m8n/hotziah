import { updateComment } from "@/service/server/comments.server";
import { decodeToken } from "@/service/server/util/decodeToken.util";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizeCommentFrom } from "@/service/server/util/sanitization.util";
import { validateCommentDto } from "@/service/validations/Comment.validation";
import { NextRequest, NextResponse } from "next/server";
/**
 * Handles the PUT request to update a comment based on the provided comment ID.
 * Validates the user's permission and authorization before updating the comment.
 * @param req The NextRequest object containing the request data.
 * @param params The parameters object containing the comment ID.
 * @returns a JSON response with the updated comment or appropriate error messages.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const token = req.cookies.get("session")?.value;
    if (!token) {
      const err = handleRouteError("Invalid token", 400);
      return NextResponse.json(err.error, { status: +err.status });
    }

    const [commentDto, { commentId }, { userId, userPermission }] =
      await Promise.all([req.json(), params, decodeToken(token)]);

    if (!commentDto || commentId !== commentDto.id) {
      const err = handleRouteError("Invalid comment or comment id", 400);
      return NextResponse.json(err.error, { status: +err.status });
    }

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
    const err = handleRouteError("Failed to update comment", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
