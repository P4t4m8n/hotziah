import { formatDate } from "@/service/client/util/app.util";
import { IPost } from "@/service/models/post.model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: IPost;
}
export default function PostPreview({ post }: Props) {
  const { title, _count, comments, forumId, id, author } = post;
  const comment = comments?.[0];
  const { createdAt, author: commentAuthor } = comment || {};

  const latestPostDate = formatDate(createdAt);

  return (
    <Link
      href={`/forum/${forumId}/post/${id}`}
      className="grid grid-cols-4 gap-6 p-2 py-4  border-b last:border-b-0 hover:shadow-xl hover:translate-y-1 hover:rounded-lg  transition-all duration-300"
    >
      <h2 className="text-left font-bold truncate">{title}</h2>
      <span className="text-left flex gap-2">
        <Image
          className="rounded-full "
          width={24}
          height={24}
          src={author.imgUrl || ""}
          alt="author-img"
        />
        <h3 className="text-sm text-platinum">{author.username}</h3>
      </span>
      {commentAuthor ? (
        <span className="text-left flex gap-2">
          <h2>{latestPostDate}</h2>
          <h2>by</h2>
          <Image
            className="rounded-full mx-2"
            width={24}
            height={24}
            src={commentAuthor.imgUrl || ""}
            alt="author-img"
          />
          <h3 className="text-sm text-platinum">{commentAuthor.username}</h3>
        </span>
      ) : (
        <h2>No posts</h2>
      )}
      <h2 className="text-right">{_count?.comments || 0}</h2>
    </Link>
  );
}
