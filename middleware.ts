import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById } from "./service/server/user.server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

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
  

  console.log("user:", user);

  return NextResponse.next();
}
