import { THERAPIST_SIGN_UP_INPUTS } from "@/service/constants/formInputs";
import TherapistEditInput from "../TherapistIndex/TherapistEdit/TherapistEditInput";
import AddressEdit from "../TherapistIndex/TherapistEdit/AddressEdit";
import CheckboxList from "../TherapistIndex/TherapistEdit/CheckboxList";
import { Languages, MeetingType, TherapistEducation } from "@prisma/client";
import TherapistEditGender from "../TherapistIndex/TherapistEdit/TherapistEditGender";
import { therapistSignup } from "@/service/server/auth.server";

export default function TherapistSignup() {
  const subjectDemo = [
    "Psychology",
    "Counseling",
    "Therapy",
    "Behavioral Therapy",
    "CBT",
    "DBT",
  ];
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

      <CheckboxList list={subjectDemo} title="Subjects" name="subjects" />
      <CheckboxList
        list={Object.keys(Languages)}
        title="Languages"
        name="languages"
      />
      <CheckboxList
        list={Object.keys(MeetingType)}
        title="Meeting Types"
        name="meetingType"
      />
      <CheckboxList
        list={Object.keys(TherapistEducation)}
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
