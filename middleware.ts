import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Permission } from "@prisma/client";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;
  const referer = req.headers.get("referer");

  let userPermission: Permission | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      userPermission = payload.permission as Permission;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
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

  return NextResponse.next();
}
