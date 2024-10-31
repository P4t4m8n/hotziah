import { MouseEvent, useRef, useState } from "react";

import { IComment } from "@/service/models/comments.model";

import { useModel } from "@/ui/hooks/useModel";

import { formatDate } from "@/service/client/util/app.util";
import { apiClientService } from "@/service/client/api.client";
import { saveComment } from "@/service/client/comment.client";

import { ArrowSvg } from "@/ui/Icons/Svgs";

import CommentList from "./CommentList";
import CommentEditNewWrapper from "../CommentEdit/CommentEditNewWrapper";
import CommentItemActions from "./CommentItemActions";
import CommentEditWrapper from "../CommentEdit/CommentEditWrapper";
import CommentUser from "../CommentUser";

interface Props {
  comment: IComment;
  submitComment: (comment: IComment) => void;
}
export default function CommentItem({ comment, submitComment }: Props) {
  const { content, author, createdAt, _count, id } = comment;
  console.log("id:", id)

  const [replies, setReplies] = useState<IComment[]>([]);
  const replayModel = useRef<HTMLFormElement>(null);
  // const [quotedText, setQuotedText] = useState("");
  const [isCommentReplayOpen, setIsCommentReplayOpen] = useModel(replayModel);
  // const contentRef = useRef<HTMLDivElement>(null);

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);


  const fetchReplies = async (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    // Close replies to prevent unnecessary checks
    if (isRepliesOpen) {
      setIsRepliesOpen(false);
      return;
    }
    try {
      if (replies.length <= 0) {
        const _comments = await apiClientService.get<IComment[]>(
          `comment/${comment.id}`
        );

        setReplies(_comments);
      }
      setIsRepliesOpen(true);
    } catch (error) {
      console.error("Failed to fetch replies", error);
    }
  };

  const submitReplay = async (replay: IComment) => {
    try {
      replay.parentId = comment.id;
      const savedReplay = await saveComment(replay);

      if (replay?.id) {
        if (replies)
          setReplies((prev) =>
            prev.map((c) => (c.id === savedReplay.id ? savedReplay : c))
          );
      } else {
        //TODO move to state?
        comment._count!.comments!++;
        if (replies) setReplies((prev) => [...prev, savedReplay]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleQuote = () => {
  //   if (contentRef.current) {
  //     // Access the text content directly through the ref without using window.getSelection()
  //     const selectedText = contentRef.current.innerText || "";

  //     // Optionally filter out the specific portion of text if needed
  //     const formattedQuote = `> "${selectedText.trim()}"\n\n`;

  //     setQuotedText(formattedQuote);
  //     setIsCommentReplayOpen(true);
  //   }
  // };

  return (
    <li className=" ">
      <div className=" p-1 py-2 rounded-lg flex flex-col gap-2 w-full min-h-40 shadow-md max-w-[70vw] h-fit bg-slate-100 relative">
        <CommentUser author={author} />
        <span className="font-thin text-xs ml-auto">
          {formatDate(createdAt)}
        </span>

        <article className=" pl-20 text-black p-4 min-h-24  ">
          {content}
        </article>

        <div className="px-4 flex items-center gap-4 w-full">
          <CommentEditWrapper comment={comment} submitComment={submitComment} />

          <button onClick={fetchReplies} className="flex gap-1 items-center">
            <span className="font-semibold text-sm">
              {_count?.comments || 0}
            </span>
            <ArrowSvg isFlip={isRepliesOpen} />
          </button>

          <CommentItemActions setIsCommentEditOpen={setIsCommentReplayOpen} />
        </div>
      </div>

      {isRepliesOpen && replies.length > 0 && (
        <div className="px-4 py-2">
          <CommentList comments={replies} submitComment={submitComment} />
        </div>
      )}

      <CommentEditNewWrapper
        submitComment={submitReplay}
        modelRef={replayModel}
        postId={comment.postId}
        isCommentEditOpen={isCommentReplayOpen}
        setIsCommentEditOpen={setIsCommentReplayOpen}
      />
    </li>
  );
}
