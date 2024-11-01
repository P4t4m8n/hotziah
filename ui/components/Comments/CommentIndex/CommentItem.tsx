import { MouseEvent, useState } from "react";

import { IComment } from "@/service/models/comments.model";

import { formatDate } from "@/service/client/util/app.util";
import { apiClientService } from "@/service/client/api.client";
import { saveComment } from "@/service/client/comment.client";

import { ArrowSvg } from "@/ui/Icons/Svgs";

import CommentList from "./CommentList";
import CommentItemActions from "./CommentItemActions";
import CommentUser from "../CommentUser";

interface Props {
  comment: IComment;
  submitComment: (comment: IComment) => void;
}
export default function CommentItem({ comment, submitComment }: Props) {
  const { content, author, createdAt, _count } = comment;
  console.log("comment:", comment)

  const [replies, setReplies] = useState<IComment[]>([]);

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
      if (!replies) {
        //TODO move to state?
        comment._count!.replies!++;
        return;
      }

      if (replay?.id) {
        if (replies)
          setReplies((prev) =>
            prev.map((c) => (c.id === savedReplay.id ? savedReplay : c))
          );
      } else {
        if (replies) setReplies((prev) => [...prev, savedReplay]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <button onClick={fetchReplies} className="flex gap-1 items-center">
            <span className="font-semibold text-sm">
              {_count?.replies || 0}
            </span>
            <ArrowSvg isFlip={isRepliesOpen} />
          </button>

          <CommentItemActions
            item={comment}
            submitComment={submitComment}
            submitReplay={submitReplay}
          />
        </div>
      </div>

      {isRepliesOpen && replies.length > 0 && (
        <div className="px-4 py-2">
          <CommentList comments={replies} submitComment={submitReplay} />
        </div>
      )}

    
    </li>
  );
}
