import { updateUniqueView } from "@/service/server/forum.server";
import { generateVisitorId } from "@/service/server/util/generateVisitorId";
import { ViewType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ forumId: string }> }
) {
  try {
    const { userId } = await req.json();
    const { forumId } = await params;
    const viewType: ViewType = "FORUM";

    if (!forumId) {
      return NextResponse.json(
        { error: "Forum ID is required" },
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

    await updateUniqueView(viewType, forumId, userId, visitorId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
