import { getTaxonomies } from "@/service/server/taxonomy.server";
import { getTherapistByUserId } from "@/service/server/therapist.server";
import { therapistService } from "@/service/service/therapist.service";
import TherapistEdit from "@/ui/components/TherapistIndex/TherapistEdit/TherapistEdit";

export async function generateStaticParams() {
  return [{ userId: "new" }];
}
export default async function TherapistEditServer({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  let therapist;
  if (userId === "new") {
    therapist = therapistService.getEmpty();
  } else {
    therapist = await getTherapistByUserId(userId);
  }
  const taxonomies = await getTaxonomies({});
  return <TherapistEdit therapist={therapist} taxonomies={taxonomies} />;
}
