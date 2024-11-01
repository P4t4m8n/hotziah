import { useRef } from "react";

import { IComment } from "@/service/models/comments.model";



interface Props {
  comment: IComment;
  submitComment: (comment: IComment) => void;
}
export default function CommentEditWrapper({ comment, submitComment }: Props) {
  console.log("submitComment:", submitComment)
  console.log("comment:", comment)
  const editModel = useRef<HTMLFormElement>(null);
  console.log("editModel:", editModel)


  return (
    <>
      <button
        className="flex border p-1 px-3 items-center gap-2 h-8 rounded-[5rem] text-xs font-semibold"
      
      >
        Edit
      </button>

     
    </>
  );
}
