import { useRef } from "react";

import { IComment } from "@/service/models/comments.model";

import { useModel } from "@/ui/hooks/useModel";

import CommentEdit from "./CommentEdit";

interface Props {
  comment: IComment;
  submitComment: (comment: IComment) => void;
}
export default function CommentEditWrapper({ comment, submitComment }: Props) {
  const editModel = useRef<HTMLFormElement>(null);

  const [isCommentEditOpen, setIsCommentEditOpen] = useModel(editModel);

  return (
    <>
      <button
        className="flex border p-1 px-3 items-center gap-2 h-8 rounded-[5rem] text-xs font-semibold"
        onClick={() => setIsCommentEditOpen((prev) => !prev)}
      >
        Edit
      </button>

      <CommentEdit
        comment={comment}
        modelRef={editModel}
        isCommentEditOpen={isCommentEditOpen}
        setIsCommentEditOpen={setIsCommentEditOpen}
        submitComment={submitComment}
      />
    </>
  );
}
