import { IUserSmall } from "@/service/models/user.model";
import Image from "next/image";

interface Props {
  admins: IUserSmall[];
  forumAdmins: IUserSmall[];
  error: string;
}
export default function ForumEditAdmins({ admins, forumAdmins, error }: Props) {
  return (
    <div className="flex flex-col gap-2 p-2 px-4">
      <label className="font-medium" htmlFor="admins">
        <h3>Select admins</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <ul className="flex flex-col h-48 overflow-auto gap-4 ">
        {admins.map((user) => (
          <li key={user.id} className="flex items-center gap-4">
            <input
              type="checkbox"
              id={`admin-${user.id}`}
              name="admins"
              value={user.id}
              defaultChecked={forumAdmins.some((admin) => admin.id === user.id)}
              className="h-4 w-4"
            />
            <label
              htmlFor={`admin-${user.id}`}
              className="flex items-center gap-2"
            >
              <Image
                width={32}
                height={32}
                src={user.imgUrl || "/default-avatar.png"}
                alt={user.username || "User"}
                className="rounded-full"
              />
              <span>{user.username}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
