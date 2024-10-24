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
}

export default function TherapistIndex({ therapists, paginationProps }: Props) {
  return (
    <div className="block h-auto">
      <TherapistHeader />
      <TherapistList therapists={therapists} />
      <TherapistListPagination {...paginationProps} />
    </div>
  );
}
