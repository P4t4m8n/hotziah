import { THERAPIST_SIGN_UP_INPUTS } from "@/service/constants/formInputs";
import TherapistEditInput from "../TherapistIndex/TherapistEdit/TherapistEditInput";
import AddressEdit from "../TherapistIndex/TherapistEdit/AddressEdit";
import CheckboxList from "../TherapistIndex/TherapistEdit/CheckboxList";
import TherapistEditGender from "../TherapistIndex/TherapistEdit/TherapistEditGender";
import { therapistSignup } from "@/service/server/auth.server";
import { ITaxonomy, TTaxonomyName } from "@/service/models/taxonomy.model";

interface Props {
  taxonomies: ITaxonomy[];
}

export default function TherapistSignup({ taxonomies }: Props) {
  const taxonomyMap = taxonomies.reduce((acc, tax) => {
    acc[tax.name as TTaxonomyName] = tax.enums;
    return acc;
  }, {} as Record<TTaxonomyName, string[]>);


  return (
    <form
      action={therapistSignup}
      className="p4 bg-slate-600 p-4 flex flex-col gap-4 "
    >
      {THERAPIST_SIGN_UP_INPUTS.map((input) => (
        <TherapistEditInput
          key={input.name}
          name={input.name}
          placeHolder={input?.placeHolder}
          type={input.type}
          labelText={input.label}
        />
      ))}

      <AddressEdit />

      <CheckboxList
        list={taxonomyMap["subjects"]}
        title="Subjects"
        name="subjects"
      />
      <CheckboxList
        list={taxonomyMap["languages"]}
        title="Languages"
        name="languages"
      />
      <CheckboxList
        list={taxonomyMap["meetingTypes"]}
        title="Meeting Types"
        name="meetingType"
      />
      <CheckboxList
        list={taxonomyMap["education"]}
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