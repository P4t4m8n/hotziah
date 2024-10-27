import { deleteLike } from "@/service/server/like.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ likeId: string }> }
) {
  try {
    const { likeId } = await params;

    const isDeleted = await deleteLike(likeId);
    if (!isDeleted) {
      const err = handleRouteError("Failed to delete like", 500);
      return NextResponse.json({ ...err });
    }

    return NextResponse.json(isDeleted, { status: 200 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json({ ...err });
  }
}
