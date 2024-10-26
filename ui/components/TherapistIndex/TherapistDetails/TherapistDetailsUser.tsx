import { IUser } from "@/service/models/user.model";
import { appService } from "@/service/service/app.service";
import { GenderFemaleSvg, GenderMaleSvg } from "@/ui/Icons/Svgs";
import { Gender } from "@prisma/client";
import Image from "next/image";

interface Props {
  user: IUser;
  gender: Gender;
}
export default function TherapistDetailsUser({ user, gender }: Props) {
  const bgColor = appService.getRandomColor();
  return (
    <div className=" relative flex flex-col w-full  items-center justify-items-center">
      <div style={{ backgroundColor: bgColor }} className="w-full h-32"></div>
      <Image
        src={user.imgUrl}
        alt="user image"
        width={144}
        height={144}
        style={{ backgroundColor: bgColor }}
        className=" rounded-full left-1/2 absolute -translate-x-1/2 top-[3.5rem] p-2 shadow-2xl  "
      />
      <div className="flex gap-4 pt-24 w-full justify-center ">
        <h2 className="text-4xl font-semibold ">{user.firstName}</h2>
        <h2 className="text-4xl font-semibold ">{user.lastName}</h2>
      </div>
      <div className="flex gap-4 items-center">
        <h6 className="text-xs text-platinum ">gender</h6>
        {gender == "MAN" ? <GenderMaleSvg /> : <GenderFemaleSvg />}
      </div>
    </div>
  );
}
