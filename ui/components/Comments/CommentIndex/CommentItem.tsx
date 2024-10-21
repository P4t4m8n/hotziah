import Image from "next/image";
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
import { likeService } from "@/service/service/like.service";

interface Props {
  comment: IComment;
  submitComment: (comment: IComment) => void;
}
export default function CommentItem({ comment, submitComment }: Props) {
  const { content, author, createdAt, likes, _count, id } = comment;

  const [replies, setReplies] = useState<IComment[]>([]);
  const replayModel = useRef<HTMLFormElement>(null);
  const [isCommentReplayOpen, setIsCommentReplayOpen] = useModel(replayModel);

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const _like = likes?.length
    ? likes[0]
    : likeService.createLikeDto("", { commentId: id });

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

  return (
    <li className=" p-2 rounded-lg flex flex-col gap-2 w-full">
      <div className="flex gap-2 items-center">
        <Image
          src={author.imgUrl || "/imgs/default-avatar.svg"}
          alt="author-image"
          width={36}
          height={36}
          className="rounded-full"
        />

        <div className=" flex flex-col ">
          <h2 className="font-bold text-sm">{comment.author.username}</h2>
          <span className="font-thin text-xs">{formatDate(createdAt)}</span>
        </div>
      </div>

      <article className="text-xs text-black p-4 max-h-24  ">{content}</article>

      <div className="px-4 flex items-center gap-4 w-full">
        <CommentEditWrapper comment={comment} submitComment={submitComment} />

        <button onClick={fetchReplies} className="flex gap-1 items-center">
          <span className="font-semibold text-sm">{_count?.comments || 0}</span>
          <ArrowSvg isFlip={isRepliesOpen} />
        </button>

        <CommentItemActions
          setIsCommentEditOpen={setIsCommentReplayOpen}
          like={_like}
          numOfLikes={_count?.likes || 0}
        />
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
