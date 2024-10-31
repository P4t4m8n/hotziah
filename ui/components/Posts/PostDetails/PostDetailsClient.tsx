"use client";

import { useCallback, useState } from "react";

import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";

import { saveComment } from "@/service/client/comment.client";

import PostCmp from "./Post/PostCmp";
import CommentList from "../../Comments/CommentIndex/CommentList";

interface props {
  post: IPost;
}
export default function PostDetailsClient({ post }: props) {
  const [comments, setComments] = useState(post.comments || []);

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

  return (
    <div className=" w-full h-full p-8 flex flex-col gap-8 ">
      <PostCmp post={post} comments={comments} submitComment={submitComment} />

      <div className="flex flex-col gap-4 w-full">
        {!comments?.length && (
          <div className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
            <h1 className="text-3xl font-semibold">No Comments Yet</h1>
            <p className="text-font-size-14 text-platinum px-4 font-semibold">
              Be the first to comment on this post
            </p>
          </div>
        )}

        {comments?.length && (
          <CommentList comments={comments} submitComment={submitComment} />
        )}
      </div>
    </div>
  );
}
