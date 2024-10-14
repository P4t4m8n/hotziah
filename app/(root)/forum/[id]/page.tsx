import { IForumDetails, IForumFilter } from "@/service/models/forum.model";
import { getEntityDetailed } from "@/service/server/generic.server";

import ForumDetailsIndex from "@/ui/components/Forum/ForumDetails/ForumDetailsIndex";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function ForumDetailsServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const forum: IForumDetails = await getEntityDetailed<
    IForumDetails,
    IForumFilter
  >({ _id: id }, "forums");

  return <ForumDetailsIndex forum={forum} />;
}
