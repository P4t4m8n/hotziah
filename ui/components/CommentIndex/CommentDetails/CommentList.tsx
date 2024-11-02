import { IComment } from "@/service/models/comments.model";
import CommentItem from "./CommentItem";

interface Props {
  comments: IComment[];
  submitComment: (comment: IComment) => void;
}

/**
 * Component that renders a list of comments.
 * Is used recursively to render nested comments.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.comments - The array of comment objects to be displayed.
 * @param {Function} props.submitComment - The function to handle comment submission.
 *
 * @returns {JSX.Element} The rendered list of comments.
 */
const CommentList = ({ comments, submitComment }: Props) => {
  return (
    <ul className="flex pt-8 pl-4 flex-col gap-12 min-h-main-height  no-scrollbar w-full p-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          submitComment={submitComment}
        />
      ))}
    </ul>
  );
};
export default CommentList;
