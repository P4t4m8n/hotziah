import { saveComment } from "@/service/client/comment.client";
import { IComment } from "@/service/models/comments.model";
import { useCallback, useState } from "react";

export const useComments = (commentsProps?: IComment[]) => {
  const [commentsState, setComments] = useState(commentsProps || []);

  const submitComment = useCallback(async (comment: IComment) => {
    try {
      const savedComment = await saveComment(comment);
      if (comment.id) {
        setComments((prev) =>
          prev.map((c) => (c.id === savedComment.id ? savedComment : c))
        );
      } else {
        setComments((prev) => [...prev, savedComment]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { comments: commentsState, submitComment };
};
