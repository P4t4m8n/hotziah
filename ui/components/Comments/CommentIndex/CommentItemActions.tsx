import {
  AddNoteASvg,
  AddNoteSvg,
  EditBtnSvg,
  PrintSvg,
  ShareSvg,
} from "@/ui/Icons/Svgs";
import Link from "next/link";
import { useRef, useState } from "react";
import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";
import { usePrint } from "@/ui/hooks/usePrint";
import NewReportWrapper from "@/ui/guards/NewReportWarper";
import ProtectedAuthor from "@/ui/guards/ProtectedAuthor";
import { useModel } from "@/ui/hooks/useModel";
import { commentService } from "@/service/service/comment.service";
import { useUser } from "@/ui/hooks/useUser";
import CommentEdit from "../CommentEdit/CommentEdit";

interface Props {
  item: IPost | IComment;
  submitComment: (comment: IComment) => void;
  submitReplay?: (replay: IComment) => void;
}

export default function CommentItemActions({
  item,
  submitComment,
  submitReplay,
}: Props) {
  const { handlePrint } = usePrint(item);
  const [isCopied, setIsCopied] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<IComment | null>(null);
  const modelRef = useRef(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const user = useUser().getCurrentUserNoRender();

  const quote = () => {
    const quote = `${item.author.username} said: ${item.content}`;
    reply(quote);
  };

  const shareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const reply = (quote?: string) => {
    console.log("quote:", quote)
    const postId = (item as IComment)?.postId
      ? (item as IComment)?.postId
      : item.id;
    const newComment: IComment = commentService.getEmpty(user!, postId!);
    if (quote) {
      newComment.content = quote;
    }

    newComment.parentId = (item as IPost)?.title ? null : item.id;
    setCommentToEdit(newComment);
    setIsModelOpen(true);
  };

  const onEdit = () => {
    setCommentToEdit(item as IComment);
    setIsModelOpen(true);
  };

  const items = [
    {
      name: "Replay",
      icon: <AddNoteASvg />,
      onClick: () => reply(),
    },
    {
      name: "Quote",
      icon: <AddNoteSvg />,
      onClick: () => quote(),
    },

    {
      name: "Share",
      icon: <ShareSvg />,
      onClick: () => shareLink(),
    },
    {
      name: "Print",
      icon: <PrintSvg />,
      onClick: () => handlePrint(),
    },
  ];

  const isPost = !!(item as IPost)?.title;

  const listStyle = isPost
    ? " grid gap-2 fixed right-4 top-1/2 -translate-y-1/2  text-center"
    : "flex gap-2 ml-auto absolute right-4 top-[90%]";
  const btnStyle = `rounded-full fill-white  ${
    isPost ? "bg-purple h-14 w-14 p-2 " : " bg-turquoise w-8 h-8 p-1  "
  }`;

  const textStyle = `text-center ${
    isPost ? "text-sm font-semibold " : "text-xs"
  }`;

  const itemType = isPost ? "post" : "comment";
  const style = {
    btnStyle,
    textStyle,
  };

  const isSubmitComment = isPost || commentToEdit?.id;
  return (
    <>
      <ul className={listStyle}>
        {items.map((item) => (
          <li className="grid gap-1 " key={item.name}>
            <button className={btnStyle} onClick={item.onClick}>
              {item.icon}
            </button>
            <span className={textStyle + " text-center"}>{item.name}</span>
          </li>
        ))}
        <NewReportWrapper itemType={itemType} item={item} style={style} />
        <li className="grid gap-1 ">
          {isPost ? (
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
          ) : (
            <button onClick={onEdit} className={btnStyle + "rounded-full  "}>
              <EditBtnSvg />
              <span className={textStyle + " text-center"}>Edit</span>
            </button>
          )}
        </li>
      </ul>
      {isCopied && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded">
          Link copied to clipboard!
        </div>
      )}
      {commentToEdit && (
        <CommentEdit
          comment={commentToEdit!}
          modelRef={modelRef}
          setIsModelOpen={setIsModelOpen}
          isModelOpen={isModelOpen}
          submitComment={isSubmitComment ? submitComment : submitReplay!}
        />
      )}
    </>
  );
}
