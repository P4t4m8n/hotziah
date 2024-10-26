import { getTaxonomies } from "@/service/server/taxonomy.server";
import { getTherapistById } from "@/service/server/therapist.server";
import { therapistService } from "@/service/service/therapist.service";
import TherapistEdit from "@/ui/components/TherapistIndex/TherapistEdit/TherapistEdit";

export async function generateStaticParams() {
  return [{ therapistId: "new" }];
}
export default async function TherapistEditServer({
  params,
}: {
  params: { therapistId: string };
}) {
  const { therapistId } = params;

  let therapist;
  if (therapistId === "new") {
    therapist = therapistService.getEmpty();
  } else {
    therapist = await getTherapistById(therapistId);
  }
  const taxonomies = await getTaxonomies({});
  return <TherapistEdit therapist={therapist} taxonomies={taxonomies} />;
}
