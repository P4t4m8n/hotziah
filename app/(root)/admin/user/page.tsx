import { IUser, IUserFilter } from "@/service/models/user.model";
import { getUsers } from "@/service/server/user.server";
import UserDashboardIndex from "@/ui/components/AdminIndex/UserDashboard/UserDashboardIndex";

export default async function UserDashboard({
  searchParams,
}: {
  searchParams?: Promise<IUserFilter> | undefined;
}) {
  const searchParamsValue = await searchParams;
  const filter: IUserFilter | null =
    searchParamsValue && Object.keys(searchParamsValue).length > 0
      ? {
          username:
            typeof searchParamsValue?.username === "string"
              ? searchParamsValue.username
              : undefined,
          email:
            typeof searchParamsValue?.email === "string"
              ? searchParamsValue.email
              : undefined,
          permission:
            typeof searchParamsValue?.permission === "string"
              ? searchParamsValue.permission
              : undefined,
          id:
            typeof searchParamsValue.id === "string"
              ? searchParamsValue.id
              : undefined,
          page:
            typeof searchParamsValue?.page === "string"
              ? parseInt(searchParamsValue.page)
              : 1,
          take:
            typeof searchParamsValue?.take === "string"
              ? parseInt(searchParamsValue.take)
              : 10,
          isTherapist:
            typeof searchParamsValue?.isTherapist === "string"
              ? searchParamsValue.isTherapist === "true"
              : undefined,
          firstName:
            typeof searchParamsValue?.firstName === "string"
              ? searchParamsValue.firstName
              : undefined,
          lastName:
            typeof searchParamsValue?.lastName === "string"
              ? searchParamsValue.lastName
              : undefined,
        }
      : { take: 10, page: 1 };
  let users: IUser[] = [];

  if (filter) {
    users = await getUsers(filter);
  }

  return <UserDashboardIndex users={users} />;
}
