import { IUser } from "@/service/models/user.model";
import Image from "next/image";

interface Props {
  admins: IUser[];
}
export default function AdminList({ admins }: Props) {
  const avatarCount = admins.length;

  return (
    <div className="flex items-center ">
      <h2 className="font-bold">Admins:</h2>
      <ul
        className="avatars"
        style={
          {
            "--avatar-count": avatarCount,
          } as React.CSSProperties
        }
      >
        {admins.map((admin) => (
          <li key={admin._id} className="avatar">
            <Image
              src={admin.imgUrl || ""}
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
