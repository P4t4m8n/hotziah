import { IUser } from "@/service/models/user.model";
import UserFilter from "./UserFilter";
import UserList from "./UserList";

interface Props {
  users: IUser[];
}
export default function UserDashboardIndex({ users }: Props) {
  return (
    <div className="flex flex-col gap-4 pt-4 px-4  h-user-dashboard ">
      <UserFilter />
      <UserList users={users} />
    </div>
  );
}
