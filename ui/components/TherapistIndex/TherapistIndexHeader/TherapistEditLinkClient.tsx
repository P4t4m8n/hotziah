"use client";
import { useUser } from "@/ui/hooks/useUser";
import Link from "next/link";
import React from "react";

export default function TherapistEditLinkClient() {
  const user = useUser().user;
  const style =
    "bg-orange rounded-lg flex gap-2 h-12 w-fit p-2 items-center justify-center ";
  return (
    <>
      {!user || !user?.isTherapist ? (
        <Link className={style} href={"/therapistSignup"}>
          Create Therapist
        </Link>
      ) : (
        <Link className={style} href={`/therapist/edit/${user?.id}`}>
          Edit Therapist
        </Link>
      )}
    </>
  );
}
