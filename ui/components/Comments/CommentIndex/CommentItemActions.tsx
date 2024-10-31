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
import { MouseEvent,  useState } from "react";
import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";
import { usePrint } from "@/ui/hooks/usePrint";

interface Props {
  setIsCommentEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQuote: (e: MouseEvent) => void;
  item: IPost | IComment;
}

export default function CommentItemActions({
  setIsCommentEditOpen,
  onQuote,
  item,
}: Props) {
  const { handlePrint } = usePrint(item);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };
  const items = [
    {
      name: "Replay",
      icon: <AddNoteASvg />,
      onClick: () => setIsCommentEditOpen(true),
    },
    {
      name: "Quote",
      icon: <AddNoteSvg />,
      onClick: (e: MouseEvent) => onQuote(e),
    },
    {
      name: "Report",
      icon: <ReportSvg />,
      onClick: () => {},
    },
    {
      name: "Share",
      icon: <ShareSvg />,
      onClick: handleCopyLink,
    },
    {
      name: "Print",
      icon: <PrintSvg />,
      onClick: (e:MouseEvent) => handlePrint(e),
    },
  ];

  const isPost = !!(item as IPost)?.title;

  const listStyle = isPost
    ? " grid gap-2 fixed right-4 top-1/2 -translate-y-1/2  text-center"
    : "flex gap-2 ml-auto absolute right-4 top-[90%]";
  const btnStyle = isPost
    ? "bg-purple h-14 w-14 p-2 "
    : " bg-turquoise w-8 h-8 p-1  ";

  const textStyle = isPost ? "text-sm font-semibold " : "text-xs ";
  return (
    <>
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
          <ProtectedAuthor authorId={item?.author.id}>
            <Link
              className={btnStyle + "rounded-full  "}
              href={`/forum/${(item as IPost)?.forumId}/post/edit/${
                (item as IPost)?.id
              }`}
            >
              <EditBtnSvg />
            </Link>
            <span className={textStyle + " text-center"}>Edit</span>
          </ProtectedAuthor>
        </li>
      </ul>
      {isCopied && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded">
          Link copied to clipboard!
        </div>
      )}
    </>
  );
}
