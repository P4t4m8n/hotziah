import ForumList from "./ForumList";
import ForumIndexHeader from "./ForumIndexHeader";
import { IForum } from "@/service/models/forum.model";

interface Props {
  forums: IForum[];
}
export default function ForumIndex({ forums }: Props) {
  return (
    <div className="bg-orange-500 p-4 h-full overflow-auto no-scrollbar">
      <ForumIndexHeader />
      <ForumList forums={forums} />
    </div>
  );
}
