import { savePost } from "@/service/server/post.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: PostToSave = await req.json();
    console.log("data:", data);

    const post = await savePost(data);
    console.log("post:", post);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json({ ...err });
  }
}
