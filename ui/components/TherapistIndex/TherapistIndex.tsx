import { ITherapist } from "@/service/models/therapists.model";
import TherapistList from "./TherapistList";
import TherapistHeader from "./TherapistHeader";
import TherapistListPagination from "./TherapistListPagination";

interface Props {
  therapists: ITherapist[];
  paginationProps: {
    total: number;
    pageSize: number;
    page: number;
  };
  taxonomies: Record<TTaxonomyName, string[]>;
}

export default function TherapistIndex({
  therapists,
  paginationProps,
  taxonomies,
}: Props) {
  return (
    <div className="block h-auto">
      <TherapistHeader taxonomies={taxonomies} />
      <TherapistList therapists={therapists} />
      <TherapistListPagination {...paginationProps} />
    </div>
  );
}
