"use client";

import { IComment } from "@/service/models/comments.model";
import { commentService } from "@/service/service/comment.service";
import { useUser } from "@/ui/hooks/useUser";
import CommentEdit from "./CommentEdit";
import { Dispatch, RefObject, SetStateAction } from "react";

interface Props {
  onSubmitComment: (comment: IComment) => void;
  setIsCommentEditOpen: Dispatch<SetStateAction<boolean>>;
  isCommentEditOpen: boolean;
  modelRef: RefObject<HTMLFormElement>;
  postId: string;
}

//Wrapper for new comment component
export default function CommentEditNewClient({
  onSubmitComment,
  modelRef,
  isCommentEditOpen,
  postId,
  setIsCommentEditOpen,
}: Props) {
  const user = useUser().user;

  const newComment: IComment = commentService.getEmptyEntity(user, postId);
  newComment.parentId = null;
  return (
    <CommentEdit
      comment={newComment}
      onSubmit={onSubmitComment}
      modelRef={modelRef}
      isCommentEditOpen={isCommentEditOpen}
      setIsCommentEditOpen={setIsCommentEditOpen}
    />
  );
}
