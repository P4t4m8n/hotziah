import { IUser } from "@/service/models/user.model";
import UserItem from "./UserItem";

interface Props {
  users: IUser[];
}
export default function UserList({ users }: Props) {
  return (
    <>
      <div className="grid grid-cols-5 border-b w-full">
        <h3>id</h3>
        <h3>username</h3>
        <h3>email</h3>
        <h3>permission</h3>
        <h3>isTherapist</h3>
      </div>
      <ul className="flex gap-2 flex-col h-user-list overflow-auto no-scrollbar">
        {users.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </ul>
    </>
  );
}
