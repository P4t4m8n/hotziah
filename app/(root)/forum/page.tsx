import { IForum, TForumType } from "@/service/models/forum.model";
import { getForums } from "@/service/server/forum.server";
import ForumClient from "@/ui/components/Forum/ForumClient";

export default async function FormServer() {
  const forums = await getForums({});
  const forumsGrouped: { key: TForumType; value: IForum[] }[] = [];
  forums.forEach((forum) => {
    const group = forumsGrouped.find((group) => group.key === forum.type);
    if (group) {
      group.value.push(forum);
    } else {
      forumsGrouped.push({ key: forum.type, value: [forum] });
    }
  });

  return <ForumClient forums={forumsGrouped} />;
}
