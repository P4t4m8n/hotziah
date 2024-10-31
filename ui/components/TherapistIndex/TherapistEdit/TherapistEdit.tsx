"use client";
import { ITherapist } from "@/service/models/therapists.model";
import { addressService } from "@/service/service/address.service";
import AddressEdit from "./AddressEdit";
import CheckboxList from "../../General/CheckboxList";
import TherapistEditInput from "./TherapistEditInput";
import { saveTherapistForm } from "@/service/server/therapist.server";
import { useActionState } from "react";
import TherapistEditGender from "./TherapistEditGender";
import { useUser } from "@/ui/hooks/useUser";

interface Props {
  therapist: ITherapist;
  taxonomies: Record<TTaxonomyName, string[]>;
}

export default function TherapistEdit({ therapist, taxonomies }: Props) {
  const user = useUser().user;
  const [state, editAction] = useActionState(saveTherapistForm, undefined);
  console.log("state:", state);

  let { address } = therapist;

  if (!address) address = addressService.getEmpty();
  const input: TInput = {
    type: "tel",
    name: "phone",
    label: "Phone",
    placeHolder: "Phone",
    required: true,
    pattern: "^\\d{3}-\\d{7}$",
    title: "Phone number must be in the format xxx-xxxxxxx.",
    inputMode: "numeric",
  };

  const { subjects, languages, meetingType, gender, education } = therapist;

  return (
    <form className="p-6  bg-slate-600 flex flex-col gap-4" action={editAction}>
      <input type="hidden" name="id" value={therapist.id} />
      <input type="hidden" name="userId" value={user?.id} />

      <TherapistEditInput input={input} value={therapist.phone} />

      <AddressEdit addressProp={address} />

      <CheckboxList
        list={taxonomies.subjects}
        name="subjects"
        checkAgainst={subjects}
        title="Subjects"
      />
      <CheckboxList
        list={taxonomies.languages}
        name="languages"
        checkAgainst={languages}
        title="Languages"
      />
      <CheckboxList
        list={taxonomies.meetingTypes}
        name="meetingType"
        checkAgainst={meetingType}
        title="Meeting Types"
      />

      <TherapistEditGender gender={gender} />

      <CheckboxList
        list={taxonomies.education}
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
