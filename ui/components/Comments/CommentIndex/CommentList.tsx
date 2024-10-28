import { IComment } from "@/service/models/comments.model";
import CommentItem from "./CommentItem";

interface Props {
  comments: IComment[];
  submitComment: (comment: IComment) => void;
}

export default function CommentList({ comments, submitComment }: Props) {
  return (
    <ul className="flex pt-8 pl-4 flex-col gap-4 min-h-main-height  no-scrollbar w-full p-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          submitComment={submitComment}
        />
      ))}
    </ul>
  );
}
