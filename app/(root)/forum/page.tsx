import { IForumDetails, IForumFilter } from "@/service/models/forum.model";
import { getEntities } from "@/service/server/generic.server";
import ForumIndexHeader from "@/ui/components/Forum/ForumIndexHeader";
import ForumList from "@/ui/components/Forum/ForumList";

export default async function FormIndexServer() {
  const forums = await getEntities<IForumDetails, IForumFilter>({}, "forums");

  return (
    <div className="bg-orange-500 p-4 h-full overflow-auto no-scrollbar">
      <ForumIndexHeader />
      <ForumList forums={forums} />
    </div>
  );
}
