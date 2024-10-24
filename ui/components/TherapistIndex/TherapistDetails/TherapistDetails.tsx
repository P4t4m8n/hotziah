import { ITherapist } from "@/service/models/therapists.model";
import TherapistDetailsUser from "./TherapistDetailsUser";
import TherapistDetailsContact from "./TherapistDetailsContact";
import FieldsList from "./FieldsList";

interface Props {
  therapist: ITherapist;
}
export default function TherapistDetails({ therapist }: Props) {
  const {
    phone,
    address,
    subjects,
    languages,
    meetingType,
    gender,
    education,
    summary,
    user,
  } = therapist;
  return (
    <div className="grid gap-4 w-full justify-items-center  ">
      <TherapistDetailsUser user={user!} gender={gender} />
      <p className=" w-[32rem] text-lg text-black font-bold bg-light-blue p-8 rounded-lg">
        {summary ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id excepturi doloribus nesciunt, fugiat fugit fuga aspernatur architecto, impedit sint provident dolorem at voluptates harum molestiae neque veritatis magni quas unde?"}{" "}
      </p>
      <TherapistDetailsContact
        address={address!}
        email={user!.email}
        phone={phone}
      />
      <FieldsList title="Education" list={education} />
      <FieldsList title="Languages" list={languages} />
      <FieldsList title="Meeting Type" list={meetingType} />
      <FieldsList title="Subjects" list={subjects} />
    </div>
  );
}
