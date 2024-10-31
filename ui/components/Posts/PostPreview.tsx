import { formatDate } from "@/service/client/util/app.util";
import { IPost } from "@/service/models/post.model";
import Link from "next/link";
import PostPinBtn from "./PostPinBtn";

interface Props {
  post: IPost;
}
export default function PostPreview({ post }: Props) {
  const { title, _count, forumId, id, author, content, createdAt, isPinned } =
    post;

  const latestPostDate = formatDate(createdAt);

  return (
    <Link
      href={`/forum/${forumId}/post/${id}`}
      className=" w-72 h-80 shadow-post-card p-2 flex flex-col rounded-xl hover:shadow-2xl hover:translate-y-1 hover:rounded-lg  transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-turquoise font-bold text-xl pb-2  line-clamp-3 ">
          {title}
        </h2>
        <PostPinBtn postId={id!} isPinned={isPinned} forumId={forumId} />
      </div>
      <span className="text-left flex gap-2">
        <h3 className="bg-purple text-white px-3 rounded-2xl">
          {author.username}
        </h3>
      </span>
      <article className="p-1 px-3 text-base font-semibold text-purple">
        {content}
      </article>
      <div className="flex justify-around text-xs mt-auto">
        <h2>{_count?.uniqueView} views</h2>
        <h2>{_count?.comments} comments</h2>
        <h2 className="text-right">{latestPostDate}</h2>
      </div>
    </Link>
  );
}
