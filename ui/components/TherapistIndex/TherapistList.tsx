import { ITherapist } from "@/service/models/therapists.model";
import TherapistPreview from "./TherapistPreview";

interface Props {
  therapists: ITherapist[];
}
export default function TherapistList({ therapists }: Props) {
  return (
    <ul className="therapist-list block">
      {therapists.map((therapist) => (
        <li className="w-full h-[30rem] therapist-card-li" key={therapist.id}>
          <TherapistPreview therapist={therapist} />
        </li>
      ))}
    </ul>
  );
}
