"use client";

import { IComment } from "@/service/models/comments.model";
import { commentService } from "@/service/service/comment.service";
import { useUser } from "@/ui/hooks/useUser";
interface Props {
  submitComment: (comment: IComment) => void;
  postId: string;
  quote?: string;
}

//Wrapper for new comment component
export default function CommentEditNewWrapper({
  postId,
  quote,
}: Props) {
  const user = useUser().user;

  const newComment: IComment = commentService.getEmpty(user!, postId);
  if (quote) {
    newComment.content = quote;
  }
  newComment.parentId = null;
  return <div></div>;
}
