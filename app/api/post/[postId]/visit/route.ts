import { addUniqueVisit } from "@/service/server/uniqueVisit.server";
import { generateVisitorId } from "@/service/server/util/generateVisitorId";
import { ViewType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await req.json();
    const { postId } = await params;
    const viewType: ViewType = "POST";

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }
    let visitorId;
    if (!userId) {
      const ipAddress =
        req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
      const userAgent = req.headers.get("user-agent") || "unknown";
      visitorId = generateVisitorId(ipAddress, userAgent);
    }

    await addUniqueVisit(viewType, postId, userId, visitorId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
