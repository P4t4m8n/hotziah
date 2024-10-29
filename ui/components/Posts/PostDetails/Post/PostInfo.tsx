import { formatDate } from "@/service/client/util/app.util";

interface Props {
  numOfComments: number;
  views: number;
  tags?: string[];
}

export default function PostInfo({ numOfComments, tags,views }: Props) {
  //TODO: replace with actual data
  const postInfo = [
    { title: "Comments", value: numOfComments || 0 },
    { title: "Views", value: views },
    { title: "Tags", value: tags?.join(", ") || "No tags" },
  ];
  return (
    <ul className="flex justify-around w-full">
      {postInfo.map((info) => (
        <li key={info.title} className="max-w-1/2">
          <h2 className="text-font-size-12 text-black font-semibold">
            {info.title}:
          </h2>
          <span className="text-font-size-14 ">{info.value}</span>
        </li>
      ))}
    </ul>
  );
}
