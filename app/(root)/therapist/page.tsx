import { getTherapists } from "@/service/server/therapist.server";
import TherapistIndex from "@/ui/components/TherapistIndex/TherapistIndex";

export default async function TherapistServer() {
  const therapists = await getTherapists({ page: 1, take: 10 });

  return <TherapistIndex therapists={therapists} />;
}
