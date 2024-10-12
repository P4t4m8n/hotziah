import { IForum } from "@/service/models/forum.model";

interface Props {
  forum: IForum;
}
export default function ForumPreview({ forum }: Props) {
  const { name, description } = forum;
  return (
    <li className="bg-blue-500 rounded-md p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-300">{description}</p>
    </li>
  );
}
