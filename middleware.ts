import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Permission } from "@prisma/client";
import { generateVisitorId } from "./service/server/util/generateVisitorId";
import { decodeToken } from "./service/server/util/decodeToken.util";

//TODO messy code, need to refactor
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;
  const referer = req.headers.get("referer");

  let userPermission: Permission | null = null;
  let userId: string | null = null;
  let visitorId: string | null = null;

  if (token) {
    try {
      const decodeObject = await decodeToken(token);
      if (!decodeObject || !decodeObject.userPermission) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      userPermission = decodeObject.userPermission;
      userId = decodeObject.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    visitorId = await generateVisitorId(ipAddress, userAgent);
  }

  if (pathname.startsWith("/api")) {
    //TODO: Add middleware for API routes
  }

  if (pathname.includes("edit") && !userPermission) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    (pathname.startsWith("/forum/edit") || pathname.startsWith("/admin")) &&
    userPermission !== "ADMIN"
  ) {
    return NextResponse.redirect(referer || new URL("/login", req.url));
  }

  const matchForum = pathname.match(/^\/forum\/([a-zA-Z0-9-]+)$/);
  const matchPost = pathname.match(
    /^\/forum\/([a-zA-Z0-9-]+)\/post\/([a-zA-Z0-9-]+)$/
  );

  if (matchForum) {
    const forumId = matchForum[1];
    await fetch(`${req.nextUrl.origin}/api/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        viewType: "FORUM",
        userId,
        visitorId,
        itemId: forumId,
      }),
    });
  }

  if (matchPost) {
    const postId = matchPost[2];
    await fetch(`${req.nextUrl.origin}/api/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        viewType: "POST",
        userId,
        visitorId,
        itemId: postId,
      }),
    });
  }

  return NextResponse.next();
}
