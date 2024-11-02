import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { IComment } from "@/service/models/comments.model";
import { IPost } from "@/service/models/post.model";
import { commentService } from "@/service/service/comment.service";

import { usePrint } from "./usePrint";

/**
 * Custom hook to handle comment actions such as replying, sharing, quoting, editing, and printing.
 *
 * @param item - The comment or post item.
 * @param setIsModelOpen - Function to set the state of the model open status.
 * @returns An object containing functions and state related to comment actions.
 *
 * @property {Function} replyComment - Function to reply to a comment, optionally with a quote.
 * @property {Function} shareLink - Function to copy the current URL to the clipboard.
 * @property {Function} handleQuote - Function to quote a comment and initiate a reply.
 * @property {Function} handlePrint - Function to print the comment or post.
 * @property {Function} onEdit - Function to set the comment to edit and open the model.
 * @property {IComment | null} commentToEdit - The comment currently being edited.
 * @property {boolean} isPost - Boolean indicating if the item is a post.
 */
export const useCommentActions = (
  item: IComment | IPost,
  setIsModelOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { handlePrint } = usePrint(item);
  const [commentToEdit, setCommentToEdit] = useState<IComment | null>(null);

  const isPost = useMemo(() => "title" in item, [item]);

  const shareLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      //TODO:add toast notification
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  }, []);

  const replyComment = useCallback(
    (quote?: string) => {
      const postId = isPost ? item.id : (item as IComment).postId;

      const newComment = commentService.getEmpty(postId!);
      //When activating from a button quote is an event
      newComment.content = typeof quote === "string" ? quote : "";
      newComment.parentId = isPost ? null : item.id;

      setCommentToEdit(newComment);
      setIsModelOpen(true);
    },
    [item, isPost, setIsModelOpen]
  );

  const handleQuote = useCallback(() => {
    const quote = `${item.author.username} said: ${item.content}`;
    replyComment(quote);
  }, [item, replyComment]);

  const onEdit = useCallback(() => {
    setCommentToEdit(item as IComment);
    setIsModelOpen(true);
  }, [item, setIsModelOpen]);

  return {
    replyComment,
    shareLink,
    handleQuote,
    handlePrint,
    onEdit,
    commentToEdit,
    isPost,
  };
};
