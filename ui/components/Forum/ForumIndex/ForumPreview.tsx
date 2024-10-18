import { formatDate } from "@/service/client/util/app.util";
import { IForum } from "@/service/models/forum.model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  forum: IForum;
  idx: number;
}

export default function ForumPreview({ forum, idx }: Props) {
  const { title, description, id, posts, _count } = forum;

  const date = formatDate(posts[0]?.comments?.[0]?.createdAt);

  return (
    <li className="rounded-lg p-4 shadow-sm border hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
      <Link href={`/forum/${id}`} className="w-full h-full flex flex-col gap-4">
        <h1
          className={`text-l flex items-center font-bold svg-background-${
            idx % 23
          } text-white h-18 p-4 py-6 rounded-xl font-semibold`}
        >
          {title.toUpperCase()}
        </h1>

        <div className="flex gap-10 px-4">
          <span className="">
            <h3 className="text-platinum font-semibold text-sm">Topics</h3>
            <h2 className="font-bold ">{_count?.posts || 0}</h2>
          </span>

          <span className="">
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
          {posts[0]?.id ? (
            <div className="h-8 flex gap-4 px-2">
              <Image
                width={32}
                height={32}
                src={posts[0]?.author.imgUrl || ""}
                alt="user"
                className="rounded-full"
              />
              <h2 className="font-bold truncate">{posts[0].title}</h2>
            </div>
          ) : (
            <h2 className="font-bold truncate">Be the first to post</h2>
          )}
        </div>
      </Link>
    </li>
  );
}
