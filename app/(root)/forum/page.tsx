import { IForumDetails, IForumFilter } from "@/service/models/forum.model";
import { getEntities } from "@/service/server/generic.server";

import ForumIndex from "@/ui/components/Forum/ForumIndex/ForumIndex";

export default async function FormIndexServer() {
  const forums = await getEntities<IForumDetails, IForumFilter>({}, "forums");

  return <ForumIndex forums={forums} />;
}
