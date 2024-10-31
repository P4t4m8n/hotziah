import {
  AddNoteASvg,
  AddNoteSvg,
  EditBtnSvg,
  PrintSvg,
  ReportSvg,
  ShareSvg,
} from "@/ui/Icons/Svgs";
import ProtectedAuthor from "../../General/ProtectedAuthor";
import Link from "next/link";

interface Props {
  setIsCommentEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPost?: boolean;
  postEditProps?: {
    authorId?: string;
    forumId?: string;
    postId?: string;
  };
}

export default function CommentItemActions({
  setIsCommentEditOpen,
  isPost,
  postEditProps,
}: Props) {
  const items = [
    {
      name: "Replay",
      icon: <AddNoteASvg />,
      onClick: () => setIsCommentEditOpen(true),
    },
    {
      name: "Quote",
      icon: <AddNoteSvg />,
      onClick: () => {},
    },
    {
      name: "Report",
      icon: <ReportSvg />,
      onClick: () => {},
    },
    {
      name: "Share",
      icon: <ShareSvg />,
      onClick: () => {},
    },
    {
      name: "Print",
      icon: <PrintSvg />,
      onClick: () => {},
    },
  ];

  const listStyle = isPost
    ? " grid gap-2 fixed right-4 top-1/2 -translate-y-1/2  text-center"
    : "flex gap-2 ml-auto absolute right-4 top-[90%]";
  const btnStyle = isPost
    ? "bg-purple h-14 w-14 p-2 "
    : " bg-turquoise w-8 h-8 p-1  ";

  const textStyle = isPost ? "text-sm font-semibold " : "text-xs ";
  return (
    <ul className={listStyle}>
      {items.map((item) => (
        <li className="grid gap-1 " key={item.name}>
          <button
            className={btnStyle + "rounded-full fill-white "}
            onClick={item.onClick}
          >
            {item.icon}
          </button>
          <span className={textStyle + " text-center"}>{item.name}</span>
        </li>
      ))}
      <li className="grid gap-1 ">
        <ProtectedAuthor authorId={postEditProps?.authorId}>
          <Link
            className={btnStyle + "rounded-full  "}
            href={`/forum/${postEditProps?.forumId}/post/edit/${postEditProps?.postId}`}
          >
            <EditBtnSvg />
          </Link>
          <span className={textStyle + " text-center"}>Edit</span>
        </ProtectedAuthor>
      </li>
    </ul>
  );
}
