import { ITherapist } from "@/service/models/therapists.model";
import { GenderFemaleSvg, GenderMaleSvg } from "@/ui/Icons/Svgs";
import Image from "next/image";
import CheckBox from "../../General/CheckBox";

interface Props {
  therapist: ITherapist;
  color: string;
}

export default function TherapistPreviewFront({ therapist, color }: Props) {
  console.log("color:", color);
  const checkBox = {
    divStyle: "w-full px-6 my-4",
    labelStyle:
      "w-full bg-orange text-xl font-semibold block text-center p-2 rounded-3xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer ",
    inputStyle: "",
    labelText: "Details",
    name: `flip-${therapist.id}`,
    value: false,
    hidden: true,
  };

  return (
    <div className="therapist-card hover:scale-105 transition-all duration-200">
      <div style={{ backgroundColor: color }} className={`hero`}></div>
      <Image
        src={therapist.user?.imgUrl || "imgs/default-avatar.png"}
        alt="therapist avatar"
        width={96}
        height={96}
      />
      <div className="flex flex-col  w-full items-center info">
        <span className="flex gap-2 justify-center font-bold text-xl w-full text-slate-950">
          <h3 className=" truncate w-1/3 text-right">
            {therapist?.user?.firstName}
          </h3>
          <h3 className=" truncate w-1/3 text-left">
            {therapist?.user?.lastName}
          </h3>
        </span>
        <h4 className="text-xs">{therapist.education[0]}</h4>
        <div className="flex py-4 items-center justify-around w-full">
          <div className="flex flex-col items-center">
            {therapist.gender == "MAN" ? (
              <GenderMaleSvg />
            ) : (
              <GenderFemaleSvg />
            )}
            <h6 className="text-xs text-platinum ">gender</h6>
          </div>
          <span className="flex flex-col items-center">
            <h5 className="font-semibold">{therapist.subjects[0]}</h5>
            <h6 className="text-xs text-platinum">main subject</h6>
          </span>
        </div>
        <CheckBox checkBoxProps={checkBox} />
        <p className=" line-clamp-4 px-8 text-center">
          {therapist.summary ||
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam perferen."}
        </p>
      </div>
    </div>
  );
}
