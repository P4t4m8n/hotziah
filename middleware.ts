import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = req.cookies.get("session");
  // // const { pathname, searchParams } = req.nextUrl;
  // // const id = searchParams.get("_id");
  // let user: {
  //   userId: string;
  //   iat: number;
  //   exp: number;
  // } | null = null;
  // if (token) {
  //   user = jwt.decode(token.value) as {
  //     userId: string;
  //     iat: number;
  //     exp: number;
  //   };
  // }

  // if (pathname.includes()) {
  //   if (!id || !user || user.userId !== id) {

  //     const returnUrl = req.nextUrl.clone();
  //     returnUrl.pathname = "/";
  //     returnUrl.searchParams.delete("_id");
  //     return NextResponse.redirect(returnUrl);
  //   }
  // }

  // if (pathname === "/login") {
  //   const returnUrl = req.nextUrl.clone();
  //   returnUrl.pathname = "/";
  //   returnUrl.searchParams.set("showDialog", "y");

  //   return NextResponse.redirect(returnUrl);
  // }

  return res;
}
