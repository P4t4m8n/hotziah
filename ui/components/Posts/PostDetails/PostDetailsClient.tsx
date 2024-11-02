"use client";
import React from "react";

import { IPost } from "@/service/models/post.model";
import { useComments } from "@/ui/hooks/useComments";

import DetailedPostComponent from "./Post/DetailedPostComponent";
import CommentList from "../../CommentIndex/CommentDetails/CommentList";
import CommentItemActions from "../../CommentIndex/CommentDetails/CommentItemActions";
import NoCommentsSection from "./NoCommentsSection";

interface Props {
  post: IPost;
}
/**
 * `PostDetailsClient` is a memoized React functional component that displays the details of a post,
 * including its comments and actions related to comments.
 *
 * @component
 * @param {Props} props - The properties object.
 * @param {Post} props.post - The post object containing details and comments.
 *
 * @returns {JSX.Element} The rendered component.
 * @example
 * <PostDetailsClient post={post} />
 * @remarks
 * This component uses the `useComments` hook to manage the comments state and the `submitComment` function.
 * It conditionally renders a `NoCommentsSection` if there are no comments, otherwise it renders a `CommentList`.
 * Additionally, it includes `CommentItemActions` for actions related to the post.
 */
const PostDetailsClient: React.FC<Props> = React.memo(({ post }) => {
  const { comments = [], submitComment } = useComments(post.comments);

  return (
    <div className="w-full h-full p-8 flex gap-1">
      <div className="w-[calc(100%-3.5rem)]">
        <DetailedPostComponent post={post} />
        <div className="flex flex-col gap-4 w-full">
          {!comments?.length ? (
            <NoCommentsSection />
          ) : (
            <CommentList comments={comments} submitComment={submitComment} />
          )}
        </div>
      </div>
      <CommentItemActions item={post} submitComment={submitComment} />
    </div>
  );
});
PostDetailsClient.displayName = "PostDetailsClient";
export default PostDetailsClient;
