"use client";

import { IComment } from "@/service/models/comments.model";
import { ArrowSvg, BookmarkSvg, CopySvg, LikeSvg } from "@/ui/Icons/Svgs";
import { MouseEvent, useRef, useState } from "react";
import CommentLIst from "./CommentLIst";
import { useModel } from "@/ui/hooks/useModel";
import CommentEdit from "./CommentEdit/CommentEdit";
import { apiClientService } from "@/service/client/api.client";
import CommentEditNewClient from "./CommentEdit/CommentEditNewClient";
import { saveComment } from "@/service/client/comment.client";

interface Props {
  comment: IComment;
  onSubmitComment: (comment: IComment) => void;
}

export default function CommentItemClient({ comment, onSubmitComment }: Props) {
  const [replies, setReplies] = useState<IComment[]>([]);
  const editModel = useRef<HTMLFormElement>(null);
  const replayModel = useRef<HTMLFormElement>(null);
  const [isCommentEditOpen, setIsCommentEditOpen] = useModel(editModel);
  const [isCommentReplayOpen, setIsCommentReplayOpen] = useModel(replayModel);

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

  const onSubmitReplay = async (replay: IComment) => {
    try {
      replay.parentId = comment.id;
      const savedReplay = await saveComment(replay);
   
      if (replay?.id) {
        if (replies)
          setReplies((prev) =>
            prev.map((c) => (c.id === savedReplay.id ? savedReplay : c))
          );
      } else {
        comment._count!.replies = comment._count!.replies + 1;
        if (replies) setReplies((prev) => [...prev, savedReplay]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-4 flex items-center gap-4 w-full">
        <button
          className="flex border p-1 px-3 items-center gap-2 h-8 rounded-[5rem] text-xs font-semibold"
          onClick={() => setIsCommentEditOpen((prev) => !prev)}
        >
          Edit
        </button>
        <button onClick={handleReplies} className="flex gap-1 items-center">
          <span className="font-semibold text-sm">
            {_count?.replies || 0}
          </span>
          <ArrowSvg isFlip={isRepliesOpen} />
        </button>

        <div className="flex gap-2">
          <button className="flex border  px-3 items-center gap-2  rounded-[5rem]">
            <span className="text-xs font-semibold">55</span>
            <LikeSvg />
          </button>

          <button className="border rounded-full  flex items-center justify-center w-8 h-8">
            <CopySvg />
          </button>
          <button className="border rounded-full  flex items-center justify-center w-8 h-8">
            <BookmarkSvg />
          </button>
          <button
            onClick={() => setIsCommentReplayOpen((prev) => !prev)}
            className="flex border p-1 px-3 items-center gap-2 h-8 rounded-[5rem] text-xs font-semibold"
          >
            REPLAY
          </button>
        </div>
      </div>
      {isRepliesOpen && replies.length > 0 && (
        <div className="px-4 py-2">
          <CommentLIst comments={replies} onSubmitComment={onSubmitReplay} />
        </div>
      )}

      <CommentEdit
        comment={comment}
        modelRef={editModel}
        isCommentEditOpen={isCommentEditOpen}
        setIsCommentEditOpen={setIsCommentEditOpen}
        onSubmit={onSubmitComment}
      />
      <CommentEditNewClient
        onSubmitComment={onSubmitReplay}
        modelRef={replayModel}
        postId={comment.postId}
        isCommentEditOpen={isCommentReplayOpen}
        setIsCommentEditOpen={setIsCommentReplayOpen}
      />
    </>
  );
}
