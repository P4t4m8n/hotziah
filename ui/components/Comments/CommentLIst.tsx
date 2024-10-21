import { IComment } from "@/service/models/comments.model";
import CommentItem from "./CommentItem";

interface Props {
  comments: IComment[];
  onSubmitComment: (comment: IComment) => void;
}

export default function CommentLIst({ comments,onSubmitComment }: Props) {
  return (
    <ul className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onSubmitComment={onSubmitComment}  />
      ))}
    </ul>
  );
}
