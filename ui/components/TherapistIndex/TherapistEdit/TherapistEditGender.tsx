import { GenderFemaleSvg, GenderMaleSvg } from "@/ui/Icons/Svgs";

export default function TherapistEditGender() {
  return (
    <div>
      <label className="py-2 block font-semibold">Gender:</label>
      <div className="flex gap-4">
        <div className="flex flex-col justify-center gap-2 items-center">
          <input type="radio" id="female" name="gender" value="FEMALE" />
          <label
            className="flex flex-col justify-center items-center"
            htmlFor="female"
          >
            <GenderFemaleSvg />
            <span>Female</span>
          </label>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center">
          <input type="radio" id="male" name="gender" value="MALE" />
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
