import React from "react";
import TherapistFilter from "./TherapistFilter";
import TherapistEditLinkClient from "./TherapistIndexHeader/TherapistEditLinkClient";

export default function TherapistHeader() {
  return (
    <div className="flex justify-around h-16 py-4">
      <TherapistFilter />
      <TherapistEditLinkClient />
    </div>
  );
}
