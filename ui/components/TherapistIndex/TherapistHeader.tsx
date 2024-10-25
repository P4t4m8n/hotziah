import React from "react";
import TherapistFilter from "./TherapistFilter";
import Link from "next/link";

export default function TherapistHeader() {
  return (
    <div className="flex justify-around h-16 py-4">
      <TherapistFilter />
      <Link
        className="bg-orange rounded-lg flex gap-2 h-12 w-fit p-2 items-center justify-center "
        href={"/therapistSignup"}
      >
        Create Therapist
      </Link>
    </div>
  );
}
