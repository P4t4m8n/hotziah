import { formatDate } from "@/service/client/util/app.util";
import { IPost } from "@/service/models/post.model";
import Image from "next/image";
import UserListIcons from "../../Forum/ForumDetails/AdminList";
import { IComment } from "@/service/models/comments.model";
import CommentItemActionsClient from "../../Comments/CommentItemActionsClient";
import { useRef } from "react";
import CommentEditNewClient from "../../Comments/CommentEdit/CommentEditNewClient";
import { useModel } from "@/ui/hooks/useModel";

interface Props {
  post: IPost;
  comments?: IComment[];
  onSubmitComment: (comment: IComment) => void;
}
export default function PostInfo({ post, comments, onSubmitComment }: Props) {
  const modelRef = useRef<HTMLFormElement>(null);
  const [isCommentEditOpen, setIsCommentEditOpen] = useModel(modelRef);

  const { title, author, content, _count } = post;

  const postInfo = [
    { title: "REPLIES", value: _count?.comments || 0 },
    { title: "VIEWS", value: 15 },
    { title: "LIKES", value: 200 },
    { title: "LAST COMMENT ", value: formatDate(comments?.[0]?.createdAt) },
  ];

  const authors = comments?.map((comment) => comment.author);
  const cleanAuthorsDuplicate =
    authors?.filter(
      (author, index, self) =>
        index === self.findIndex((t) => t.id === author.id)
    ) || [];
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

      <CommentItemActionsClient setIsCommentEditOpen={setIsCommentEditOpen} />

      <CommentEditNewClient
        onSubmitComment={onSubmitComment}
        setIsCommentEditOpen={setIsCommentEditOpen}
        isCommentEditOpen={isCommentEditOpen}
        modelRef={modelRef}
        postId={post.id!}
      />

      <ul className="flex justify-between">
        {postInfo.map((info) => (
          <li key={info.title}>
            <h2 className="text-font-size-12 text-platinum font-semibold">
              {info.title}
            </h2>
            <span className="text-font-size-14">{info.value}</span>
          </li>
        ))}
      </ul>

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
