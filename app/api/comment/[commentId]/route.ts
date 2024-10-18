import { getCommentById, getComments } from "@/service/server/comments.server";
import { handleError } from "@/service/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const { commentId } = params;

  try {
    const comments = await getComments({ parentId: commentId });
    if (!comments) {
      return NextResponse.json(
        { message: "Comments not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    const formattedError = handleError(error, "Failed to fetch comments");

    return NextResponse.json(
      { message: formattedError.message },
      { status: 500 }
    );
  }
}
