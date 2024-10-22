import { getComments } from "@/service/server/comments.server";
import { handleError } from "@/service/server/util/error.util";
import { NextRequest, NextResponse } from "next/server";

//Get comments based on the parentId
//ParentId of dirent comments to a post have null as parentId

export async function GET(
  req: NextRequest,
  { params }: { params: { parentId: string } }
) {
  const { parentId } = params;

  try {
    const comments = await getComments({ parentId });
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
