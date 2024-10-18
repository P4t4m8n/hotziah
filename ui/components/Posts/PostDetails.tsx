import { formatDate } from "@/service/client/util/app.util";
import { IPost } from "@/service/models/post.model";
import Image from "next/image";
import UserListIcons from "../Forum/ForumDetails/AdminList";
import CommentLIst from "../Comments/CommentLIst";

interface props {
  post: IPost;
}
export default function PostDetails({ post }: props) {
  const { title, author, content, comments, _count } = post;
  const date = formatDate(comments?.[0]?.createdAt);

  const threadInfo = [
    { title: "REPLIES", value: _count?.comments || 0 },
    { title: "VIEWS", value: 15 },
    { title: "LIKES", value: 200 },
    { title: "LAST COMMENT ", value: date },
  ];

  const authors = comments?.map((comment) => comment.author);
  const cleanAuthorsDuplicate =
    authors?.filter(
      (author, index, self) =>
        index === self.findIndex((t) => t.id === author.id)
    ) || [];

  return (
    <div className=" w-full h-full p-4 flex gap-8 ">
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

        <article className="text-pretty text-font-size-14 text-slate-200 h-1/2 overflow-auto no-scrollBar">
          {content}
        </article>

        <ul className="flex justify-between">
          {threadInfo.map((info) => (
            <li key={info.title}>
              <h2 className="text-font-size-12 text-platinum font-semibold">
                {info.title}
              </h2>
              <span className="text-font-size-14">{info.value}</span>
            </li>
          ))}
        </ul>

        {authors?.length && (
          <div>
            <h2>Top commenter</h2>
            <UserListIcons users={cleanAuthorsDuplicate} />
          </div>
        )}
      </div>

      {comments?.length ? (
        <CommentLIst comments={comments} />
      ) : (
        <div className="bg-dark-blue text-white h-full w-[45%] max-w-96 min-w-64 p-8 rounded-lg flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">No Comments Yet</h1>
          <p className="text-font-size-14 text-slate-200">
            Be the first to comment on this post
          </p>
        </div>
      )}
    </div>
  );
}
