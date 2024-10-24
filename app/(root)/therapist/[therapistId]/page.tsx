import { getTherapistById } from "@/service/server/therapist.server";
import { therapistService } from "@/service/service/therapist.service";
import TherapistDetails from "@/ui/components/TherapistIndex/TherapistDetails/TherapistDetails";

export async function generateStaticParams() {
  return [{ therapistId: "1" }];
}
export default async function TherapistDetailsServer({
  params,
}: {
  params: { therapistId: string };
}) {
  const { therapistId } = params;
  //Get empty therapist to prevent props error
  let therapist = therapistService.getEmpty();
  //Only fetch when there is a real ID. temp ID exist for SSG
  if (therapistId !== "1") therapist = await getTherapistById(therapistId);
  return <TherapistDetails therapist={therapist} />;
}
