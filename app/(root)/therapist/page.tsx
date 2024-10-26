import { ITherapistFilter } from "@/service/models/therapists.model";
import { getTherapists } from "@/service/server/therapist.server";
import TherapistIndex from "@/ui/components/TherapistIndex/TherapistIndex";

export default async function TherapistServer({
  searchParams,
}: {
  searchParams?: ITherapistFilter | null;
}) {
  //await searchParams as new Next 15 feature to ignore error
  const filter: ITherapistFilter =
    searchParams && Object.keys(await searchParams).length > 0
      ? {
          subjects:
            typeof searchParams.subjects === "string"
              ? [searchParams.subjects]
              : undefined,
          languages:
            typeof searchParams.languages === "string"
              ? [searchParams.languages]
              : undefined,
          meetingType:
            typeof searchParams.meetingType === "string"
              ? [searchParams.meetingType]
              : undefined,
          firstName: searchParams.firstName
            ? searchParams.firstName
            : undefined,
          lastName: searchParams.lastName ? searchParams.lastName : undefined,
          page: searchParams.page ? searchParams.page : 1,
          take: searchParams.take ? searchParams.take : 10,
        }
      : { page: 1, take: 10 };
  filter.status = "ACTIVE";
  const { therapists, total } = await getTherapists(filter);
  const paginationProps = {
    total,
    pageSize: filter.take || 10,
    page: filter.page || 1,
  };

  return (
    <TherapistIndex therapists={therapists} paginationProps={paginationProps} />
  );
}
