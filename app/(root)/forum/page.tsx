import { IForumFilter } from "@/service/models/forum.model";
import { getForums } from "@/service/server/forum.server";
import ForumIndex from "@/ui/components/Forum/ForumIndex/ForumIndex";

export default async function FormIndexServer({
  searchParams,
}: {
  searchParams?: Promise<IForumFilter> | undefined;
}) {
  const forums = await getForums({});

  return <ForumIndex forums={forums} />;
}
