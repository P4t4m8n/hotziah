import { IForum } from "@/service/models/forum.model";
import { forumServer, forumService } from "@/service/server/forum.server";
import { userServer } from "@/service/server/user.server";

import ForumEditIndex from "@/ui/components/Forum/ForumEdit/ForumEditIndex";

export async function generateStaticParams() {
  return [{ forumId: "new" }];
}

export default async function ForumEditServer({
  params,
}: {
  params: { forumId: string };
}) {
  const { forumId } = params;

  let forum: IForum;

  if (forumId === "new") {
    forum = forumService.getEmptyEntity!();
  } else {
    forum = await forumServer.get(forumId);
  }

  const admins = await userServer.query({ permission: "ADMIN" });

  return <ForumEditIndex forum={forum} admins={admins} />;
}
