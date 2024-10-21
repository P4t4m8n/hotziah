import { IUserSmall } from "@/service/models/user.model";
import Image from "next/image";

interface Props {
  users: IUserSmall[];
  listName?: string;
}
export default function UserListIcons({ users, listName }: Props) {
  const avatarCount = users.length;

  return (
    <div className="flex items-center ">
      <h2 className="font-bold">{listName ? listName + ":" : ""}</h2>
      <ul
        className="avatars"
        //Set avatar count for grid columns in globals css
        style={
          {
            "--avatar-count": avatarCount,
          } as React.CSSProperties
        }
      >
        {users.map((user) => (
          <li key={user.id} className="avatar">
            <Image
              src={user.imgUrl || ""}
              alt="admin-avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
