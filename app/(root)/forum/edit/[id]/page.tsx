import { FORUM_TYPE, IForum, IForumFilter } from "@/service/models/forum.model";
import { IUser, IUserFIlter } from "@/service/models/user.model";
import { saveForum } from "@/service/server/forum.server";
import { getEntities, getEntity } from "@/service/server/generic.server";
import { forumServerService } from "@/service/server/util/forum.server.util";
import ForumEditIndex from "@/ui/components/Forum/ForumEdit/ForumEditIndex";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "new" }];
}

export default async function ForumEditServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let forum: IForum;

  if (id === "new") {
    forum = forumServerService.getEmptyForum();
  } else {
    forum = await getEntity<IForum, IForumFilter>({ _id: id }, "forums");
  }

  const admins = await getEntities<IUser, IUserFIlter>(
    { permission: "admin" },
    "users"
  );

  return <ForumEditIndex forum={forum} admins={admins} />;
}
