import { IUser } from "@/service/models/user.model";
import UserFilter from "./UserFilter";

interface Props {
  users: IUser[];
}
export default function UserDashboardIndex({ users }: Props) {
  return (
    <div>
      <UserFilter />
      <ul className="flex gap-2 flex-col">
        <li className="grid grid-cols-5">
          <h3>id</h3>
          <h3>username</h3>
          <h3>email</h3>
          <h3>permission</h3>
          <h3>isTherapist</h3>
        </li>
        {users.map((user) => (
          <li key={user.id} className="grid grid-cols-5">
            <h4>{user.id}</h4>
            <h4>{user.username}</h4>
            <h4>{user.email}</h4>
            <h4>{user.permission}</h4>
            <h4>{user.isTherapist ? "Yes" : "No"}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}
