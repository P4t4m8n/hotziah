
export const dynamic = "force-dynamic";

import { getSessionUser } from "@/service/server/auth.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching session user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
