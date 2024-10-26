import { ITherapist } from "@/service/models/therapists.model";
import { addressService } from "@/service/service/address.service";
import AddressEdit from "./AddressEdit";
import CheckboxList from "./CheckboxList";
import { GenderFemaleSvg, GenderMaleSvg } from "@/ui/Icons/Svgs";
import { ITaxonomy } from "@/service/models/taxonomy.model";
import { taxonomyService } from "@/service/service/taxonomy.service";

interface Props {
  therapist: ITherapist;
  taxonomies: ITaxonomy[];
}

export default function TherapistEdit({ therapist, taxonomies }: Props) {
  const taxonomyMap = taxonomyService.transformTaxonomy(taxonomies);

  let { address } = therapist;

  if (!address) address = addressService.getEmpty();

  const { subjects, languages, meetingType, gender, education } = therapist;

  return (
    <form action="/api/therapist/update" method="POST">
      <input type="hidden" name="id" value={therapist.id} />

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={therapist.phone}
          required
        />
      </div>

      <AddressEdit addressProp={address} />

      <CheckboxList
        list={taxonomyMap.subjects}
        name="subjects"
        checkAgainst={subjects}
        title="Subjects"
      />
      <CheckboxList
        list={taxonomyMap.languages}
        name="languages"
        checkAgainst={languages}
        title="Languages"
      />
      <CheckboxList
        list={taxonomyMap.meetingTypes}
        name="meetingType"
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
        list={taxonomyMap.education}
        name="education"
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
