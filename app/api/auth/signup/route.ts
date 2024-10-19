// import { IUserDto } from "@/service/models/user.model";
import { signup } from "@/service/server/auth.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.json();
    const user = await signup(formData);
    return NextResponse.json(user);
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
