import { updateTherapistStatus } from "@/service/server/therapist.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ therapistId: string }> }
) {
  try {
    const { status } = await req.json();
    console.log("status:", status);
    const { therapistId } = await params;
    console.log("therapistId:", therapistId);

    await updateTherapistStatus(therapistId, status);
    return NextResponse.json({ message: "Therapist updated" });
  } catch (error) {
    const err = handleRouteError("Failed to update therapist", 500, error);
    return NextResponse.json({ ...err });
  }
}
