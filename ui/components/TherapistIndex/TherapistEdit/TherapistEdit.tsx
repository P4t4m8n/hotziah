import { ITherapist } from "@/service/models/therapists.model";
import { addressService } from "@/service/service/address.service";
import AddressFieldSet from "./AddressFieldSet";
import CheckboxList from "./CheckboxList";
import { Languages, MeetingType, TherapistEducation } from "@prisma/client";
import { GenderFemaleSvg, GenderMaleSvg } from "@/ui/Icons/Svgs";

interface Props {
  therapist: ITherapist;
}

export default function TherapistEdit({ therapist }: Props) {
  console.log("therapist:", therapist);
  let { address } = therapist;

  if (!address) address = addressService.getEmpty();

  const { subjects, languages, meetingType, gender, education } = therapist;

  const subjectDemo = [
    "Psychology",
    "Counseling",
    "Therapy",
    "Behavioral Therapy",
    "CBT",
    "DBT",
  ];
  return (
    <form action="/api/therapist/update" method="POST">
      <input type="hidden" name="id" value={therapist.id} />

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="text"
          defaultValue={therapist.phone}
          required
        />
      </div>

      <AddressFieldSet addressProp={address} />

      <CheckboxList
        list={subjectDemo}
        checkAgainst={subjects}
        title="Subjects"
      />
      <CheckboxList
        list={Object.keys(Languages)}
        checkAgainst={languages}
        title="Languages"
      />
      <CheckboxList
        list={Object.keys(MeetingType)}
        checkAgainst={meetingType}
        title="Meeting Types"
      />

      <div>
        <label>Gender:</label>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="FEMALE"
            defaultChecked={therapist.gender === "FEMALE"}
          />
          <label htmlFor="female">
            <GenderFemaleSvg />
            <span>Female</span>
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="MALE"
            defaultChecked={gender === "MAN"}
          />
          <label htmlFor="male">
            <GenderMaleSvg />
            <span>Man</span>
          </label>
        </div>
      </div>

      <CheckboxList
        list={Object.keys(TherapistEducation)}
        checkAgainst={education}
        title="Education"
      />

      <div>
        <label htmlFor="summary">Summary:</label>
        <textarea
          id="summary"
          name="summary"
          rows={5}
          defaultValue={therapist.summary}
          required
        />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}
