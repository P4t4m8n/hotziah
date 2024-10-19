import { IComment } from "@/service/models/comments.model";
import { createComment } from "@/service/server/comments.server";
import { commentService } from "@/service/service/comment.service";
import { handleRouteError } from "@/service/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { comment, parentId }: { comment: IComment; parentId: string } =
      await req.json();
    const { postId } = params;

    if (!comment) {
      const err = handleRouteError("Comment content is required", 400);
      return NextResponse.json({ ...err });
    }

    if (parentId && typeof parentId !== "string") {
      const err = handleRouteError("Invalid parent comment id", 400);
      return NextResponse.json({ ...err });
    }

    if (!comment.author) {
      const err = handleRouteError("Comment author is required", 400);
      return NextResponse.json({ ...err });
    }
    const dto = commentService.toDTO(comment, postId, parentId);
    const newComment = await createComment(dto);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to create comment", 500, error);
    return NextResponse.json({ ...err });
  }
}
