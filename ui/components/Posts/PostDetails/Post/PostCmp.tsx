import { useRef } from "react";
import Image from "next/image";

import { IPost } from "@/service/models/post.model";
import { IComment } from "@/service/models/comments.model";

import { useModel } from "@/ui/hooks/useModel";
import { cleanDuplicateUsers } from "@/service/client/util/app.util";

import CommentItemActions from "../../../Comments/CommentIndex/CommentItemActions";
import CommentEditNewWrapper from "../../../Comments/CommentEdit/CommentEditNewWrapper";
import UserListIcons from "../../../Forum/ForumDetails/AdminList";
import PostInfo from "./PostInfo";

interface Props {
  post: IPost;
  comments?: IComment[];
  submitComment: (comment: IComment) => void;
}
export default function PostCmp({ post, comments, submitComment }: Props) {
  const modelRef = useRef<HTMLFormElement>(null);
  const [isCommentEditOpen, setIsCommentEditOpen] = useModel(modelRef);

  const { title, author, content, _count } = post;

  const authors = comments?.map((comment) => comment.author);
  const cleanAuthorsDuplicate = cleanDuplicateUsers(authors);

  return (
    <div className=" bg-dark-blue text-white h-full w-[55%] max-w-96 min-w-64 p-8 rounded-lg flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">{title}</h1>

      <div className="flex gap-2 items-center">
        <Image
          src={author?.imgUrl || ""}
          alt={"author-image"}
          width={32}
          height={32}
          className="rounded-full "
        />
        <span className="font-thin">{author?.username}</span>
      </div>

      <article className="text-pretty text-font-size-14 text-slate-200 h-2/3 overflow-auto no-scrollBar">
        {content}
      </article>

      <CommentItemActions setIsCommentEditOpen={setIsCommentEditOpen} />

      <CommentEditNewWrapper
        submitComment={submitComment}
        setIsCommentEditOpen={setIsCommentEditOpen}
        isCommentEditOpen={isCommentEditOpen}
        modelRef={modelRef}
        postId={post.id!}
      />

      <PostInfo
        numOfComments={_count?.comments || 0}
        lastCommentData={comments?.[0]?.createdAt}
      />

      {authors?.length ? (
        <div>
          <h2>Top commenter</h2>
          <UserListIcons users={cleanAuthorsDuplicate} />
        </div>
      ) : (
        <h2>No comments yet</h2>
      )}
    </div>
  );
}
