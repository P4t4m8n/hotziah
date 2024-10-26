import { ITaxonomy } from "@/service/models/taxonomy.model";
import { ITherapistFilter } from "@/service/models/therapists.model";
import { getTaxonomies } from "@/service/server/taxonomy.server";
import { getTherapists } from "@/service/server/therapist.server";
import TherapistDashboardIndex from "@/ui/components/AdminIndex/TherapistDashboard.tsx/TherapistDashboardIndex";

export default async function TherapistDashBoard({
  searchParams,
}: {
  searchParams?: ITherapistFilter | null;
}) {
  const x = await searchParams;
  const filter: ITherapistFilter =
    x && Object.keys(x).length > 0
      ? {
          subjects: typeof x.subjects === "string" ? [x.subjects] : undefined,
          languages:
            typeof x.languages === "string" ? [x.languages] : undefined,
          meetingType:
            typeof x.meetingType === "string" ? [x.meetingType] : undefined,
          firstName: x.firstName ? x.firstName : undefined,
          lastName: x.lastName ? x.lastName : undefined,
          status: x.status ? x.status : "PENDING",
          page: x.page ? x.page : 1,
          take: x.take ? x.take : 10,
        }
      : { page: 1, take: 10 };

  const pendingTherapists = await getTherapists(filter);

  const taxonomies = await getTaxonomies({});

  return (
    <TherapistDashboardIndex
      therapists={pendingTherapists.therapists}
      total={pendingTherapists.total}
      filter={filter}
      taxonomies={taxonomies}
    />
  );
}
