import { IUserDto } from "@/service/models/user.model";
import { signup } from "@/service/server/auth.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userDto: IUserDto = await req.json();
    console.log("userDto:", userDto)
    const user = await signup(userDto);
    console.log("user:", user)
    return NextResponse.json(user);
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
