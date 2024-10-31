import { useRef } from "react";

import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";

import { useModel } from "@/ui/hooks/useModel";

import CommentItemActions from "../../../Comments/CommentIndex/CommentItemActions";
import CommentEditNewWrapper from "../../../Comments/CommentEdit/CommentEditNewWrapper";
import PostInfo from "./PostInfo";
import CommentUser from "@/ui/components/Comments/CommentUser";
import PostHeader from "./PostHeader";

interface Props {
  post: IPost;
  comments?: IComment[];
  submitComment: (comment: IComment) => void;
}
export default function PostCmp({ post, submitComment }: Props) {
  const modelRef = useRef<HTMLFormElement>(null);
  const [isCommentEditOpen, setIsCommentEditOpen] = useModel(modelRef);

  const { title, author, content, _count, createdAt, updatedAt } = post;

  return (
    <div className="w-[80vw] h-fit relative">
      <div className=" bg-purple text-white  pl-24 pt-8 p-4 rounded-lg flex flex-col gap-8">
        <PostHeader title={title} createdAt={createdAt} updatedAt={updatedAt} />

        <CommentUser author={author} isPost />

        <article className="text-pretty font-semibold text-black h-36 overflow-auto no-scrollBar">
          {content}
        </article>

        <CommentEditNewWrapper
          submitComment={submitComment}
          setIsCommentEditOpen={setIsCommentEditOpen}
          isCommentEditOpen={isCommentEditOpen}
          modelRef={modelRef}
          postId={post.id!}
        />
        <PostInfo
          numOfComments={_count?.comments || 0}
          tags={post.tags}
          views={_count?.uniqueView || 0}
        />
      </div>
      <CommentItemActions setIsCommentEditOpen={setIsCommentEditOpen} isPost />
    </div>
  );
}
