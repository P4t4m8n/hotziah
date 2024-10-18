import { getForumById } from "@/service/server/forum.server";
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
  const forum = await getForumById(forumId);

  return <ForumDetailsIndex forum={forum} />;
}
