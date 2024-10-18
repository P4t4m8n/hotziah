"use client";

import { IComment } from "@/service/models/comments.model";
import { ArrowSvg, BookmarkSvg, CopySvg, LikeSvg } from "@/ui/Icons/Svgs";
import { MouseEvent, useState } from "react";
import CommentLIst from "./CommentLIst";

interface Props {
  comment: IComment;
}

export default function CommentItemClient({ comment }: Props) {
  const [replies, setReplies] = useState<IComment[]>([]);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const { _count } = comment;
  const handleReplies = async (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (isRepliesOpen) {
      setIsRepliesOpen(false);
      return;
    }
    try {
      if (replies.length <= 0) {
        const res = await fetch(`/api/comment/${comment.id}`);
        const data: IComment[] = await res.json();
        setReplies(data);
      }
      setIsRepliesOpen(true);
    } catch (error) {
      console.error("Failed to fetch replies", error);
    }
  };

  return (
    <div>
      <div className="px-4 flex justify-between w-full">
        <button onClick={handleReplies} className="flex gap-1 items-center">
          <span className="font-semibold text-sm">
            {_count?.replies} replies
          </span>
          <ArrowSvg isFlip={isRepliesOpen} />
        </button>

        <div className="flex gap-2">
          <button className="flex border  px-3 items-center gap-2  rounded-[5rem]">
            <span className="text-xs font-semibold">
              55
            </span>
            <LikeSvg />
          </button>

          <button className="border rounded-full  flex items-center justify-center w-8 h-8">
            <CopySvg />
          </button>
          <button className="border rounded-full  flex items-center justify-center w-8 h-8">
            <BookmarkSvg />
          </button>
          <button className="flex border p-1 px-3 items-center gap-2 h-8 rounded-[5rem] text-xs font-semibold">
            REPLAY
          </button>
        </div>
      </div>

      {(isRepliesOpen && replies.length > 0) && (
        <div className="px-4 py-2">

        <CommentLIst comments={replies} />
        </div>
      )}
    </div>
  );
}
