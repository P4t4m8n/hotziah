import {
  ITherapist,
  ITherapistFilter,
} from "@/service/models/therapists.model";
import DashboardList from "../DashboardList";
import TherapistListPagination from "../../TherapistIndex/TherapistListPagination";
import TherapistFilterClient from "../../TherapistIndex/TherapistFilter";
import { ITaxonomy, TTaxonomyName } from "@/service/models/taxonomy.model";

interface props {
  therapists: ITherapist[];
  total: number;
  filter: ITherapistFilter;
  taxonomies: Record<TTaxonomyName, string[]>;
}
export default function TherapistDashboardIndex({
  therapists,
  total,
  filter,
  taxonomies,
}: props) {
  const listHeaders = [
    "FIRST NAME",
    "LAST NAME",
    "EMAIL",
    "PERMISSION",
    "ACTIONS",
  ];

  const paginationProps = {
    total,
    pageSize: filter.take || 10,
    page: filter.page || 1,
  };

  return (
    <div className="pt-4">
      <TherapistFilterClient taxonomies={taxonomies} />
      <DashboardList
        listHeaders={listHeaders}
        type="therapist"
        items={therapists}
      />
      <TherapistListPagination {...paginationProps} />
    </div>
  );
}
