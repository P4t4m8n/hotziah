import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById } from "./service/server/user.server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;
  const referer = req.headers.get("referer");

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };

      if (decoded.userId) {
        user = await getUserById(decoded.userId);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  if (pathname.startsWith("/api")) {
    //TODO: Add middleware for API routes
  }

  if (
    pathname.startsWith("/forum/edit/new") &&
    (!user || user.permission !== "ADMIN")
  ) {
    return NextResponse.redirect(referer || new URL("/login", req.url));
  }

  console.log("user:", user);

  return NextResponse.next();
}
