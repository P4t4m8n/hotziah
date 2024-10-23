import { ITherapist } from "@/service/models/therapists.model";
import TherapistPreviewFront from "./TherapistPreviewFront";
import TherapistPreviewBack from "./TherapistPreviewBack";
import { appService } from "@/service/service/app.service";

interface Props {
  therapist: ITherapist;
}
export default function TherapistPreview({ therapist }: Props) {
  const color = appService.getRandomColor();

  return (
    <div className="therapist-card-con h-[30rem]">
      <TherapistPreviewFront therapist={therapist} color={color} />
      <TherapistPreviewBack therapist={therapist} color={color} />
    </div>
  );
}
