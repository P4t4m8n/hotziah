import { ITherapist } from "@/service/models/therapists.model";

interface Props {
  therapist: ITherapist;
}

export default function TherapistEdit({ therapist }: Props) {
  console.log("therapist:", therapist);
  return <div>TherapistEdit</div>;
}
