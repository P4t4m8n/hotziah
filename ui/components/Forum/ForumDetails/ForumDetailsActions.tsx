import { IUserSmall } from "@/service/models/user.model";
import { EditBtnSvg, PlusSvg } from "@/ui/Icons/Svgs";

import Link from "next/link";
import UserListIcons from "./AdminList";
import ProtectedBtn from "../../General/ProtectedBtn";

interface Props {
  description: string;
  admins: IUserSmall[];
  id: string;
}
export default function ForumDetailsActions({
  description,
  admins,
  id,
}: Props) {
  return (
    <div className="flex justify-between items-center p-6">
      <p className=" font-semibold text-sm line-clamp-2 max-w-[50ch]">
        {description}
      </p>
      <UserListIcons users={admins} listName="Admins" />
      <div className="flex gap-2">
        <ProtectedBtn
          href={`/forum/edit/${id}`}
          text={"EDIT FORUM"}
          svg={<EditBtnSvg />}
        />
        <Link
          className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
          href={`/forum/${id}/post/edit/new`}
        >
          <PlusSvg />
          <h4 className="text-xs font-bold text-blue">NEW THREAD</h4>
        </Link>
      </div>
    </div>
  );
}
