import { IComment } from "@/service/models/comments.model";

import { formatDate } from "@/service/client/util/app.util";

import CommentList from "./CommentList";
import CommentItemActions from "./CommentItemActions";
import CommentUser from "../CommentUser";
import { useComments } from "@/ui/hooks/useComments";

interface Props {
  comment: IComment;
  submitComment: (comment: IComment) => void;
}
/**
 * Component representing a single comment item.
 * Is used recursively to render nested comment.
 * @component
 * @param {Props} props - The properties object.
 * @param {IComment} props.comment - The comment data.
 * @param {Function} props.submitComment - Function to submit a new comment.
 *
 * @returns {JSX.Element} The rendered comment item component.
 *
 * @example
 * <CommentItem comment={comment} submitComment={submitComment} />
 *
 * @remarks
 * This component displays a comment with its author, content, creation date, and any replies.
 * It also includes actions for submitting replies and displays a list of replies.
 */
const CommentItem = ({ comment, submitComment }: Props): JSX.Element => {
  const { content, author, createdAt } = comment;

  const { comments: replies, submitComment: submitReplay } = useComments(
    comment.replies
  );
  const onSubmitReplay = async (replay: IComment) => {
    const newReplay = { ...replay, parentId: comment.id };
    submitReplay(newReplay);
  };

  return (
    <li className=" ">
      <div className=" p-1 py-2 rounded-lg flex flex-col gap-2 w-full min-h-40 shadow-md max-w-[70vw] h-fit bg-slate-100 relative">
        <CommentUser author={author} />
        <span className="font-thin text-xs ml-auto">
          {formatDate(createdAt)}
        </span>

        <article className=" pl-20 text-black p-4 min-h-24  ">
          {content}
        </article>

        <div className="px-4 flex items-center gap-4 w-full">
          <span className="font-semibold text-sm">{replies?.length ?? 0}</span>

          <CommentItemActions
            item={comment}
            submitComment={submitComment}
            submitReplay={onSubmitReplay}
          />
        </div>
      </div>

      <CommentList comments={replies} submitComment={onSubmitReplay} />
    </li>
  );
};

export default CommentItem;
