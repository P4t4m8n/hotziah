import { IForum, TForumType } from "@/service/models/forum.model";
import ForumPreview from "./ForumPreview";

interface Props {
  groupedForum: { key: TForumType; value: IForum[] };
}
export default function ForumList({ groupedForum }: Props) {
  const { key, value } = groupedForum;
  return (
    <li className="bg-yellow-800 rounded-lg p-2 flex flex-col gap-2">
      <h2 className="text-xl border-b-2 w-fit pb-2">{key}</h2>
      <ul className="bg-yellow-700 rounded-lg p-2 flex flex-col gap-4 ">
        {value.map((forum) => (
          <ForumPreview key={forum._id} forum={forum} />
        ))}
      </ul>
    </li>
  );
}
