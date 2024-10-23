import { ITherapist } from "@/service/models/therapists.model";
import Image from "next/image";
import CheckBox from "../../General/CheckBox";

interface Props {
  therapist: ITherapist;
  color: string;
}
export default function TherapistPreviewBack({ therapist, color }: Props) {
  const checkBox = {
    divStyle: "w-full px-6 my-4",
    labelStyle:
      "w-full bg-orange text-xl font-semibold block text-center p-2 rounded-3xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer ",
    inputStyle: "",
    labelText: "Details",
    name: `flip-${therapist.id + "back"}`,
    value: false,
    hidden: true,
  };
  return (
    <div className="therapist-card  flip">
      <div style={{ backgroundColor: color }} className={"hero " + color}></div>
      <Image
        src={therapist?.user?.imgUrl || ""}
        alt="therapist avatar"
        width={96}
        height={96}
      />
      <div className="info px-2 h-full overflow-auto flex flex-col gap-1">
        <div>
          <h3 className="pb-1 text-sm font-bold">Subjects:</h3>
          <ul className="flex flex-wrap gap-2">
            {therapist.subjects.map((subject) => (
              <li className="border p-1 px-2 rounded-md " key={subject}>
                {subject}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="pb-1 text-sm font-bold">Languages:</h3>
          <ul className="flex flex-wrap gap-2">
            {therapist.languages.map((language) => (
              <li className="border p-1 px-2 rounded-md flex-1 " key={language}>
                {language}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="pb-1 text-sm font-bold">Meeting:</h3>
          <ul className="flex flex-wrap gap-2">
            {therapist.meetingType.map((meetingType) => (
              <li
                className="border p-1 px-2 rounded-md flex-1 "
                key={meetingType}
              >
                {meetingType}
              </li>
            ))}
          </ul>
        </div>
      <CheckBox checkBoxProps={checkBox} />
      </div>
    </div>
  );
}
