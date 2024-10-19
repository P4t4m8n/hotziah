"use client";

import { IComment } from "@/service/models/comments.model";
import { commentService } from "@/service/service/comment.service";
import { useUser } from "@/ui/hooks/useUser";
import CommentEdit from "./CommentEdit";

interface Props {
  onSubmitComment: (comment: IComment) => void;
}

export default function CommentEditNewClient({ onSubmitComment }: Props) {
  const user = useUser().user;

  if (!user) {
    return <div>Log in to comment</div>;
  }

  const newComment: IComment = commentService.getEmptyEntity(user);
  return <CommentEdit comment={newComment} onSubmit={onSubmitComment} />;
}
