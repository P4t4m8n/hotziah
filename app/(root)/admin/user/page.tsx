import { ITaxonomy } from "@/service/models/taxonomy.model";
import { IUser, IUserFilter } from "@/service/models/user.model";
import { getTaxonomies } from "@/service/server/taxonomy.server";
import { getUsers } from "@/service/server/user.server";
import { getCachedData } from "@/service/server/util/cache.util";
import UserDashboardIndex from "@/ui/components/AdminIndex/UserDashboard/UserDashboardIndex";

export default async function UserDashboard({
  searchParams,
}: {
  searchParams?: IUserFilter | null;
}) {
  const filter: IUserFilter | null =
    searchParams && Object.keys(searchParams).length > 0
      ? {
          username:
            typeof searchParams?.username === "string"
              ? searchParams.username
              : undefined,
          email:
            typeof searchParams?.email === "string"
              ? searchParams.email
              : undefined,
          permission:
            typeof searchParams?.permission === "string"
              ? searchParams.permission
              : undefined,
          id: typeof searchParams.id === "string" ? searchParams.id : undefined,
          page:
            typeof searchParams?.page === "string"
              ? parseInt(searchParams.page)
              : 1,
          take:
            typeof searchParams?.take === "string"
              ? parseInt(searchParams.take)
              : 10,
          isTherapist:
            typeof searchParams?.isTherapist === "string"
              ? searchParams.isTherapist === "true"
              : undefined,
          firstName:
            typeof searchParams?.firstName === "string"
              ? searchParams.firstName
              : undefined,
          lastName:
            typeof searchParams?.lastName === "string"
              ? searchParams.lastName
              : undefined,
        }
      : { take: 10, page: 1 };
  let users: IUser[] = [];

  if (filter) {
    users = await getUsers(filter);
  }

  const taxonomies = await getTaxonomies({});
  return <UserDashboardIndex users={users} />;
}
