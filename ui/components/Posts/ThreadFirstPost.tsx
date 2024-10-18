import Image from "next/image";
import UserListIcons from "../Forum/ForumDetails/AdminList";
import { IUser } from "@/service/models/user.model";

interface Props {
  post: IPost;
  threadName: string;
  numOfPosts?: number;
  postsAuthors: IUser[];
  author: IUser;
}

export default function ThreadFirstPost({
  post,
  threadName,
  numOfPosts,
  postsAuthors,
  author,
}: Props) {
  const { content } = post;

  const threadInfo = [
    { title: "REPLIES", value: numOfPosts || 0 },
    { title: "VIEWS", value: 15 },
    { title: "LIKES", value: 200 },
    { title: "LAST POST ", value: "10hr" },
  ];
  return (
    <div className=" bg-dark-blue text-white h-full w-[55%] max-w-96 min-w-64 p-8 rounded-lg flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">{threadName}</h1>

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

      <div>
        <h2>Top commenter</h2>
        <UserListIcons users={postsAuthors} />
      </div>
    </div>
  );
}
