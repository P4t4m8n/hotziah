import { ICommentDto } from "@/service/models/comments.model";
import { createComment } from "@/service/server/comments.server";
import { handleRouteError } from "@/service/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { comment }: { comment: ICommentDto } = await req.json();

    if (!comment) {
      const err = handleRouteError("Comment content is required", 400);
      return NextResponse.json({ ...err });
    }

    if (!comment.authorId) {
      const err = handleRouteError("Comment author is required", 400);
      return NextResponse.json({ ...err });
    }
    const newComment = await createComment(comment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to create comment", 500, error);
    return NextResponse.json({ ...err });
  }
}
