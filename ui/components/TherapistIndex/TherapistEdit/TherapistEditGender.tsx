import { GenderFemaleSvg, GenderMaleSvg } from "@/ui/Icons/Svgs";
import { Gender } from "@prisma/client";
interface Props {
  gender?: Gender;
}

export default function TherapistEditGender({ gender }: Props) {
  return (
    <div>
      <label className="py-2 block font-semibold">Gender:</label>
      <div className="flex gap-4">
        <div className="flex flex-col justify-center gap-2 items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="FEMALE"
            defaultChecked={gender === "FEMALE"}
          />
          <label
            className="flex flex-col justify-center items-center"
            htmlFor="female"
          >
            <GenderFemaleSvg />
            <span>Female</span>
          </label>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center">
          <input
            type="radio"
            id="male"
            name="gender"
            value="MAN"
            defaultChecked={gender === "MAN"}
          />
          <label
            htmlFor="male"
            className="flex flex-col justify-center items-center"
          >
            <GenderMaleSvg />
            <span>Man</span>
          </label>
        </div>
      </div>
    </div>
  );
}
