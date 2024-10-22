import { getSessionUser } from "@/service/server/auth.server";
import { updateUser } from "@/service/server/user.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { Permission } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const { permission }: { permission: Permission } = await req.json();
    const admin = await getSessionUser();
    console.log("userId:", userId);
    console.log("permission:", permission);
    console.log("admin:", admin);

    if (!admin || admin.permission !== "ADMIN") {
      const err = handleRouteError("Unauthorized", 401);
      return NextResponse.json({ ...err });
    }

    const updatedUser = await updateUser({ id: userId, permission });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json({ ...err });
  }
}
