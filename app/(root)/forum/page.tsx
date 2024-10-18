import { getForums } from "@/service/server/forum.server";
import ForumIndex from "@/ui/components/Forum/ForumIndex/ForumIndex";

export default async function FormIndexServer() {
  const forums = await getForums({});

  return <ForumIndex forums={forums} />;
}
