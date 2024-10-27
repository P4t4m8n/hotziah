import { ITherapistFilter } from "@/service/models/therapists.model";
import { getTaxonomies } from "@/service/server/taxonomy.server";
import { getTherapists } from "@/service/server/therapist.server";
import TherapistIndex from "@/ui/components/TherapistIndex/TherapistIndex";

export default async function TherapistServer({
  searchParams,
}: {
  searchParams?: Promise<ITherapistFilter> | undefined;
}) {
  //await searchParams as new Next 15 feature to ignore error
  const searchParamsValue = await searchParams;
  const filter: ITherapistFilter =
    searchParamsValue && Object.keys(searchParamsValue).length > 0
      ? {
          subjects:
            typeof searchParamsValue.subjects === "string"
              ? [searchParamsValue.subjects]
              : undefined,
          languages:
            typeof searchParamsValue.languages === "string"
              ? [searchParamsValue.languages]
              : undefined,
          meetingType:
            typeof searchParamsValue.meetingType === "string"
              ? [searchParamsValue.meetingType]
              : undefined,
          firstName: searchParamsValue.firstName
            ? searchParamsValue.firstName
            : undefined,
          lastName: searchParamsValue.lastName
            ? searchParamsValue.lastName
            : undefined,
          page: searchParamsValue.page ? searchParamsValue.page : 1,
          take: searchParamsValue.take ? searchParamsValue.take : 10,
        }
      : { page: 1, take: 10 };
  filter.status = "ACTIVE";
  const { therapists, total } = await getTherapists(filter);
  const paginationProps = {
    total,
    pageSize: filter.take || 10,
    page: filter.page || 1,
  };

  const taxonomies = await getTaxonomies({});
  return (
    <TherapistIndex
      therapists={therapists}
      paginationProps={paginationProps}
      taxonomies={taxonomies}
    />
  );
}
