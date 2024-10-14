import { IForumDetails } from "@/service/models/forum.model";
import ForumList from "./ForumList";
import ForumIndexHeader from "./ForumIndexHeader";

interface Props {
  forums: IForumDetails[];
}
export default function ForumIndex({ forums }: Props) {
  return (
    <div className="bg-orange-500 p-4 h-full overflow-auto no-scrollbar">
      <ForumIndexHeader />
      <ForumList forums={forums} />
    </div>
  );
}
