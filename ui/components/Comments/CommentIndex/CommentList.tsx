import { IComment } from "@/service/models/comments.model";
import CommentItem from "./CommentItem";

interface Props {
  comments: IComment[];
  submitComment: (comment: IComment) => void;
}

export default function CommentList({ comments, submitComment }: Props) {
  return (
    <ul className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
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
