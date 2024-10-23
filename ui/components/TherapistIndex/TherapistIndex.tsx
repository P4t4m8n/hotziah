import { ITherapist } from "@/service/models/therapists.model";
import TherapistList from "./TherapistList";

interface Props {
  therapists: ITherapist[];
}

export default function TherapistIndex({ therapists }: Props) {
  return (
    <div>
      <TherapistList therapists={therapists} />
    </div>
  );
}
