"use client";

import { useCallback, useRef, useState } from "react";

import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";

import { saveComment } from "@/service/client/comment.client";

import PostCmp from "./Post/PostCmp";
import CommentList from "../../Comments/CommentIndex/CommentList";
import { useModel } from "@/ui/hooks/useModel";
import CommentEditNewWrapper from "../../Comments/CommentEdit/CommentEditNewWrapper";
import CommentItemActions from "../../Comments/CommentIndex/CommentItemActions";

interface props {
  post: IPost;
}
export default function PostDetailsClient({ post }: props) {
  const [comments, setComments] = useState(post.comments || []);
  const modelRef = useRef<HTMLFormElement>(null);
  const [isCommentEditOpen, setIsCommentEditOpen] = useModel(modelRef);

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

  const postEditProps = {
    forumId: post.forumId,
    postId: post.id,
    authorId: post.author.id,
  };

  return (
    <div className=" w-full h-full p-8 flex flex-col gap-8 ">
      <PostCmp post={post} />

      <CommentEditNewWrapper
        submitComment={submitComment}
        setIsCommentEditOpen={setIsCommentEditOpen}
        isCommentEditOpen={isCommentEditOpen}
        modelRef={modelRef}
        postId={post.id!}
      />
      <CommentItemActions
        setIsCommentEditOpen={setIsCommentEditOpen}
        isPost
        postEditProps={postEditProps}
      />

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
