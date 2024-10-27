import { getForumById } from "@/service/server/forum.server";
import { getUsers } from "@/service/server/user.server";
import { forumService } from "@/service/service/forum.service";

import ForumEditIndex from "@/ui/components/Forum/ForumEdit/ForumEditIndex";

export async function generateStaticParams() {
  return [{ forumId: "new" }];
}

export default async function ForumEditServer({
  params,
}: {
  params: Promise<{ forumId: string }>;
}) {
  const { forumId } = await params;

  let forum;

  if (forumId === "new") {
    forum = forumService.getEmpty();
  } else {
    forum = await getForumById(forumId);
  }

  const admins = await getUsers({ permission: "ADMIN" });

  return <ForumEditIndex forum={forum} admins={admins} />;
}
