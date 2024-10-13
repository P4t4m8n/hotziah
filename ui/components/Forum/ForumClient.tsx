import { IForum, TForumType } from "@/service/models/forum.model";
import ForumList from "./ForumList";

interface Props {
  forums: { key: TForumType; value: IForum[] }[];
}
export default function ForumClient({ forums }: Props) {
  return (
    <div className="bg-orange-500 p-4 h-full overflow-auto no-scrollbar">
      <h1 className=" text-2xl pb-8">Forums</h1>
      <ul className="flex flex-col gap-4">
        {forums.map((forum) => (
          <ForumList key={forum.key} groupedForum={forum} />
        ))}
      </ul>
    </div>
  );
}
