"use client";

import { THERAPIST_SIGN_UP_INPUTS } from "@/service/constants/formInputs";
import TherapistEditInput from "../TherapistIndex/TherapistEdit/TherapistEditInput";
import AddressEdit from "../TherapistIndex/TherapistEdit/AddressEdit";
import CheckboxList from "../TherapistIndex/TherapistEdit/CheckboxList";
import TherapistEditGender from "../TherapistIndex/TherapistEdit/TherapistEditGender";
import { therapistSignup } from "@/service/server/auth.server";
import { useActionState } from "react";
import { TTaxonomyName } from "@/service/models/taxonomy.model";

interface Props {
  taxonomies: Record<TTaxonomyName, string[]>;
}

export default function TherapistSignup({ taxonomies }: Props) {
  const [state, signupAction] = useActionState(therapistSignup, undefined);
  console.log("state:", state);

  return (
    <form
      action={signupAction}
      className="p4 bg-slate-600 p-4 flex flex-col gap-4 "
    >
      {THERAPIST_SIGN_UP_INPUTS.map((input) => (
        <TherapistEditInput key={input.name} input={input} />
      ))}

      <AddressEdit />

      <CheckboxList
        list={taxonomies.subjects}
        title="Subjects"
        name="subjects"
      />
      <CheckboxList
        list={taxonomies.languages}
        title="Languages"
        name="languages"
      />
      <CheckboxList
        list={taxonomies.meetingTypes}
        title="Meeting Types"
        name="meetingType"
      />
      <CheckboxList
        list={taxonomies.education}
        title="Education"
        name="education"
      />

      <TherapistEditGender />

      <div className="grid gap-2">
        <label htmlFor="summary">Summary:</label>
        <textarea id="summary" name="summary" rows={5} required />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}
