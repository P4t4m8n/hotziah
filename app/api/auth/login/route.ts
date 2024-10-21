// import { IUserDto } from "@/service/models/user.model";
export const dynamic = "force-dynamic";

import { IUserDto } from "@/service/models/user.model";
import { login } from "@/service/server/auth.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userDto: IUserDto = await req.json();

    const user = await login(userDto);
    return NextResponse.json(user);
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
