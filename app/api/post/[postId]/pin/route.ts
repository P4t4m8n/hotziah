import { togglePinned } from "@/service/server/post.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { isPinned } = await req.json();
    const { postId } = await params;

    await togglePinned(postId, isPinned);
    return NextResponse.json({ status: 201, message: "Success" });
  } catch (error) {
    const err = handleRouteError("Failed to pin post", 500, error);
    return NextResponse.json({ ...err });
  }
}
