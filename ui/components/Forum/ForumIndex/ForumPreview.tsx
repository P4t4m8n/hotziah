import { formatDate } from "@/service/client/util/app.util";
import { IForum } from "@/service/models/forum.model";

import Image from "next/image";
import Link from "next/link";

/**
 * Renders a preview card for a forum, displaying its title, description, number of topics,
 * last activity date, and the latest topic information. The background styling is determined
 * by the forum's index in the list.
 *
 * @param props - The properties for the component.
 * @param props.forum - The forum data object containing title, description, id, posts, and counts.
 * @param props.idx - The index of the forum in the list, used to generate a unique background class.
 * @returns A list item element representing the forum preview.
 */
interface Props {
  forum: IForum;
  idx: number;
}
const ForumPreview = ({ forum, idx }: Props) => {
  const { title, description, id, posts, _count } = forum;
  const postCount = _count?.posts || 0;
  const lastPost = posts[0];
  const lastCommentDate = lastPost?.comments?.[0]?.createdAt;
  const date = formatDate(lastCommentDate);
  const backgroundClass = `svg-background-${idx % 23}`;

  return (
    <li className="rounded-lg p-4 shadow-sm border hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
      <Link href={`/forum/${id}`} className="w-full h-full flex flex-col gap-4">
        <h1
          className={`text-l flex items-center font-bold ${backgroundClass} text-white h-18 p-4 py-6 rounded-xl`}
        >
          {title.toUpperCase()}
        </h1>

        <div className="flex gap-10 px-4">
          <span>
            <h3 className="text-platinum font-semibold text-sm">Topics</h3>
            <h2 className="font-bold">{postCount}</h2>
          </span>

          <span>
            <h3 className="text-platinum font-semibold text-sm">
              Last Activity
            </h3>
            <div className="font-bold">{date}</div>
          </span>
        </div>

        <p className="text-platinum flex-grow line-clamp-2 px-4">
          {description}
        </p>

        <div className="mt-auto px-4">
          <h2 className="text-platinum font-semibold text-sm pb-2">
            LAST TOPIC
          </h2>
          {lastPost ? (
            <div className="h-8 flex gap-4 px-2">
              <Image
                width={32}
                height={32}
                src={lastPost.author?.imgUrl || ""}
                alt="user"
                className="rounded-full"
              />
              <h2 className="font-bold truncate">{lastPost.title}</h2>
            </div>
          ) : (
            <h2 className="font-bold truncate">Be the first to post</h2>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ForumPreview;
