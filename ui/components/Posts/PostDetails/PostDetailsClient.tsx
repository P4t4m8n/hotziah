"use client";

import { IPost } from "@/service/models/post.model";
import CommentLIst from "../../Comments/CommentLIst";
import PostInfo from "./PostInfo";
import { useCallback, useState } from "react";
import { IComment } from "@/service/models/comments.model";
import { saveComment } from "@/service/client/comment.client";
import CommentEditNewClient from "../../Comments/CommentEdit/CommentEditNewClient";

interface props {
  post: IPost;
}
export default function PostDetailsClient({ post }: props) {
  const [comments, setComments] = useState(post.comments || []);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitComment = useCallback(
    async (comment: IComment) => {
      try {
        setIsLoading(true);
        const savedComment = await saveComment(comment, post.forumId, post.id);
        if (comment.id) {
          setComments((prev) =>
            prev.map((c) => (c.id === savedComment.id ? savedComment : c))
          );
        } else {
          setComments((prev) => [...prev, savedComment]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [post]
  );

  return (
    <div className=" w-full h-full p-4 flex gap-8 ">
      <PostInfo post={post} comments={comments} />

      <div>
        <CommentEditNewClient onSubmitComment={onSubmitComment} />

        {comments?.length ? (
          <CommentLIst comments={comments} />
        ) : (
          <div className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
            <h1 className="text-3xl font-semibold">No Comments Yet</h1>
            <p className="text-font-size-14 text-platinum px-4 font-semibold">
              Be the first to comment on this post
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
