import { IUser, IUserFilter } from "@/service/models/user.model";
import { getUsers } from "@/service/server/user.server";
import UserDashboardIndex from "@/ui/components/AdminIndex/UserDashboard/UserDashboardIndex";

export async function generateStaticParams() {
  return [{}];
}

export default async function UserDashboard({
  searchParams,
}: {
  searchParams: IUserFilter | null;
}) {
  const filter: IUserFilter | null = searchParams && Object.keys(searchParams).length > 0
  ? {
    username: typeof searchParams.username === 'string' ? searchParams.username : undefined,
    email: typeof searchParams.email === 'string' ? searchParams.email : undefined,
    permission: typeof searchParams.permission === 'string' ? searchParams.permission : undefined,
    id: typeof searchParams.id === 'string' ? searchParams.id : undefined,
    page: typeof searchParams.page === 'string' ? parseInt(searchParams.page) : undefined,
    amount: typeof searchParams.amount === 'string' ? parseInt(searchParams.amount) : undefined,
    isTherapist: typeof searchParams.isTherapist === 'string' ? searchParams.isTherapist === "true" : undefined,
    firstName: typeof searchParams.firstName === 'string' ? searchParams.firstName : undefined,
    lastName: typeof searchParams.lastName === 'string' ? searchParams.lastName : undefined
    
  }
  : null;
  let users: IUser[] = [];
  console.log("filter:", filter)

  if (filter) {
    users = await getUsers(filter);
    console.log("users:", users);
  }
  return <UserDashboardIndex users={users}  />;
}
