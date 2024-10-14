import { IUser } from "@/service/models/user.model";
import Image from "next/image";

interface Props {
  admins: IUser[];
  forumAdmins: IUser[];
}
export default function ForumEditAdmins({ admins, forumAdmins }: Props) {
  return (
    <div className="flex flex-col gap-2 p-2 px-4">
      <label className="font-medium" htmlFor="admins">
        Select Admins
      </label>
      <div className="flex flex-col h-48 overflow-auto gap-4 no-scrollbar">
        {admins.map((user) => (
          <div key={user._id} className="flex items-center gap-4">
            <input
              type="checkbox"
              id={`admin-${user._id}`}
              name="admins"
              value={user._id}
              defaultChecked={forumAdmins.some(
                (admin) => admin._id === user._id
              )}
              className="h-4 w-4"
            />
            <label
              htmlFor={`admin-${user._id}`}
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
          </div>
        ))}
      </div>
    </div>
  );
}
