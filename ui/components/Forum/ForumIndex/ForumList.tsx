import { IForum } from "@/service/models/forum.model";
import ForumPreview from "./ForumPreview";

interface Props {
  forums: IForum[];
}
export default function ForumList({ forums }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 h-forum-index overflow-auto no-scrollbar">
      {forums.map((forum, idx) => (
        <ForumPreview key={forum.id} forum={forum} idx={idx} />
      ))}
    </ul>
  );
}
