import { forumServer } from "@/service/server/forum.server";
import ForumIndex from "@/ui/components/Forum/ForumIndex/ForumIndex";

export default async function FormIndexServer() {
  const forums = await forumServer.query({});
  

  return <ForumIndex forums={forums} />;
}
