import { logout } from "@/service/server/auth.server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("logout route");
    await logout();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
