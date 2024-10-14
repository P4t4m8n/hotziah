import { formatDateFromObjectId } from "@/service/client/util/app.util";
import { IThreadDetails } from "@/service/models/thread.model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  thread: IThreadDetails;
}
export default function ThreadsPreview({ thread }: Props) {
  const { name, numOfPosts, posts, forumId, _id } = thread;
  const { createdDateFromId, author } = posts[0];

  const latestPostDate = formatDateFromObjectId(createdDateFromId);

  return (
    <Link
      href={`/forum/${forumId}/thread/${_id}`}
      className="grid grid-cols-3 gap-4 p-2 py-4   border-b last:border-b-0 hover:shadow-xl hover:bg-platinum hover:rounded-lg  transition-all duration-300"
    >
      <h2 className="text-left font-bold">{name}</h2>
      {author ? (
        <span className="text-left flex gap-2">
          <h2>{latestPostDate}</h2>
          <h2>by</h2>
          <Image
            className="rounded-full mx-2"
            width={24}
            height={24}
            src={author.imgUrl || ""}
            alt="author-img"
          />
          <h3 className="text-sm text-platinum">{author.username}</h3>
        </span>
      ) : (
        <h2>No posts</h2>
      )}
      <h2 className="text-right">{numOfPosts}</h2>
    </Link>
  );
}
