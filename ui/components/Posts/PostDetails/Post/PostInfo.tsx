import { formatDate } from "@/service/client/util/app.util";

interface Props {
  numOfComments: number;
  lastCommentData?: string | Date;
}

export default function PostInfo({ numOfComments, lastCommentData }: Props) {
  //TODO: replace with actual data
  const postInfo = [
    { title: "REPLIES", value: numOfComments || 0 },
    { title: "VIEWS", value: 15 },
    { title: "LIKES", value: 200 },
    { title: "LAST COMMENT ", value: formatDate(lastCommentData) },
  ];
  return (
    <ul className="flex justify-between">
      {postInfo.map((info) => (
        <li key={info.title}>
          <h2 className="text-font-size-12 text-platinum font-semibold">
            {info.title}
          </h2>
          <span className="text-font-size-14">{info.value}</span>
        </li>
      ))}
    </ul>
  );
}
