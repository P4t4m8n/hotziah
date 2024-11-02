import {
  AddNoteASvg,
  AddNoteSvg,
  EditBtnSvg,
  PrintSvg,
  ShareSvg,
} from "@/ui/Icons/Svgs";
import Link from "next/link";
import { useRef, memo, useMemo } from "react";

import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";
import { useModel } from "@/ui/hooks/useModel";
import { useCommentActions } from "@/ui/hooks/useCommentActions";

import NewReportWrapper from "@/ui/guards/NewReportWarper";
import ProtectedAuthor from "@/ui/guards/ProtectedAuthor";
import CommentEdit from "../CommentEdit/CommentEdit";
import ProtectedUser from "@/ui/guards/ProtectedUser";
/**
 * `CommentItemActions` is a memoized React functional component that renders a list of action buttons
 * for a comment or post item. The actions include sharing, printing, replying, quoting, and editing.
 * The component also conditionally renders a comment edit model form to create/edit a comment.
 * @param {Props} props - The props for the component.
 * @param {Item} props.item - The comment or post item.
 * @param {Function} props.submitComment - The function to submit a comment.
 * @param {Function} [props.submitReplay] - The function to submit a replay comment.
 *
 * @returns {JSX.Element} The rendered component.
 */
interface Props {
  item: IPost | IComment;
  submitComment: (comment: IComment) => void;
  submitReplay?: (replay: IComment) => void;
}

const CommentItemActions: React.FC<Props> = memo(
  ({ item, submitComment, submitReplay }) => {
    const modelRef = useRef(null);
    const [isModelOpen, setIsModelOpen] = useModel(modelRef);
    const {
      replyComment,
      shareLink,
      handleQuote,
      handlePrint,
      onEdit,
      commentToEdit,
      isPost
    } = useCommentActions(item, setIsModelOpen);


    const style = useMemo(
      () =>
        isPost
          ? {
              listStyle:
                "grid gap-2 fixed right-4 top-1/2 -translate-y-1/2 text-center",
              btnStyle: "rounded-full fill-white bg-purple h-14 w-14 p-2",
              textStyle: "text-sm font-semibold",
            }
          : {
              listStyle: "flex gap-2 ml-auto absolute right-4 top-[90%]",
              btnStyle: "rounded-full fill-white bg-turquoise w-8 h-8 p-1",
              textStyle: "text-xs",
            },
      [isPost]
    );

    const { listStyle, btnStyle, textStyle } = style;

    const renderActionButton = (
      name: string,
      icon: JSX.Element,
      onClick?: () => void
    ) => (
      <li className="grid gap-1">
        <button className={btnStyle} onClick={onClick}>
          {icon}
        </button>
        <span className={textStyle}>{name}</span>
      </li>
    );

    return (
      <>
        <ul className={listStyle}>
          {renderActionButton("Share", <ShareSvg />, shareLink)}
          {renderActionButton("Print", <PrintSvg />, handlePrint)}

          <ProtectedUser>
            {renderActionButton("Replay", <AddNoteASvg />, replyComment)}
            {renderActionButton("Quote", <AddNoteSvg />, handleQuote)}
            <NewReportWrapper
              itemType={isPost ? "post" : "comment"}
              item={item}
              style={{ btnStyle, textStyle }}
            />
          </ProtectedUser>

          <ProtectedAuthor authorId={item.author.id}>
            {isPost
              ? renderActionButton(
                  "Edit",
                  <Link
                    href={`/forum/${(item as IPost).forumId}/post/edit/${
                      item.id
                    }`}
                  >
                    <EditBtnSvg />
                  </Link>
                )
              : renderActionButton("Edit", <EditBtnSvg />, onEdit)}
          </ProtectedAuthor>
        </ul>

        {commentToEdit && (
          <CommentEdit
            comment={commentToEdit}
            modelRef={modelRef}
            setIsModelOpen={setIsModelOpen}
            isModelOpen={isModelOpen}
            submitComment={isPost ? submitComment : submitReplay!}
          />
        )}
      </>
    );
  }
);
CommentItemActions.displayName = "CommentItemActions";
export default CommentItemActions;
