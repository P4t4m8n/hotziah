import { ICommentDto } from "@/service/models/comments.model";
import { getSessionUser } from "@/service/server/auth.server";
import { createComment } from "@/service/server/comments.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizeCommentFrom } from "@/service/server/util/sanitization.util";
import { validateCommentDto } from "@/service/validations/Comment.validation";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the POST request to create a new comment.
 * Retrieves the comment data from the request, validates the user's authentication,
 * sanitizes the comment data, validates the comment content, and creates a new comment.
 * Returns appropriate responses based on the success or failure of the process.
 * @param req The NextRequest object containing the request data.
 * @returns A NextResponse object with the result of the comment creation process.
 */
export async function POST(req: NextRequest) {
  try {
    const { comment }: { comment: ICommentDto } = await req.json();
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
    const err = handleRouteError("Failed to create comment", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
