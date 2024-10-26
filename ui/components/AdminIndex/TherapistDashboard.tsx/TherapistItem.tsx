import { ITherapist } from "@/service/models/therapists.model";
import TherapistItemActionsClient from "./TherapistItemActionsClient";

interface Props {
  therapist: ITherapist;
}
export default function TherapistItem({ therapist }: Props) {
  console.log("therapist:", therapist);
  return (
    <li className="grid grid-cols-5">
      <h3>{therapist.user?.firstName}</h3>
      <h3>{therapist.user?.lastName}</h3>
      <h3>{therapist.user?.email}</h3>
      <h3>{therapist.user?.permission}</h3>
      <TherapistItemActionsClient status={therapist.status} therapistId={therapist.id!} />
    </li>
  );
}
