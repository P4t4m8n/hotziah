import { IUser } from "@/service/models/user.model";
import { EditBtnSvg, PlusSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";
import AdminList from "./AdminList";

interface Props {
  description: string;
  admins: IUser[];
  _id: string;
}
export default function ForumDetailsActions({
  description,
  admins,
  _id,
}: Props) {
  return (
    <div className="flex justify-between items-center p-6">
      <p className=" font-semibold text-sm line-clamp-2 max-w-[50ch]">
        {description}
      </p>
      <AdminList admins={admins} />
      <div className="flex gap-2">
        <Link
          className=" rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
          href={`/forum/edit/${_id}`}
        >
          <EditBtnSvg />
          <h4 className="text-xs font-bold text-blue">EDIT FORUM</h4>
        </Link>
        <Link
          className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
          href={`/forum/edit/new`}
        >
          <PlusSvg />
          <h4 className="text-xs font-bold text-blue">NEW THREAD</h4>
        </Link>
      </div>
    </div>
  );
}
