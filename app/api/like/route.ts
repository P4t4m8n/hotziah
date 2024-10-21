import { ILikeDto } from "@/service/models/like.model";
import { createLike } from "@/service/server/like.server";
import { handleRouteError } from "@/service/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { likeDto }: { likeDto: ILikeDto } = await req.json();
    //TODO: add data validation

    const like = await createLike(likeDto);
    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to create like", 500, error);
    return NextResponse.json({ ...err });
  }
}
