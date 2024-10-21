import { getForumById } from "@/service/server/forum.server";
import { forumService } from "@/service/service/forum.service";

import ForumDetailsIndex from "@/ui/components/Forum/ForumDetails/ForumDetailsIndex";

export async function generateStaticParams() {
  return [{ forumId: "1" }];
}

export default async function ForumDetailsServer({
  params,
}: {
  params: { forumId: string };
}) {
  const { forumId } = params;
  
  //Get empty forum to prevent props error
  let forum = forumService.getEmptyEntity();
  //Only fetch when there is a real ID. temp ID exist for SSG
  if (forumId !== "1") forum = await getForumById(forumId);

  
  return <ForumDetailsIndex forum={forum} />;
}
