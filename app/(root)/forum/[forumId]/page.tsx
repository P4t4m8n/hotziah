
import { forumServer } from "@/service/server/forum.server";
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
  const forum = await forumServer.get(forumId);

  return <ForumDetailsIndex forum={forum} />;
}
