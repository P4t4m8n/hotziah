import { IPost } from "@/service/models/posts.model";
import Image from "next/image";
import CommentsIndex from "./CommentsIndex";

interface Props {
  post: IPost;
}
export default function PostItem({ post }: Props) {
  const { author, content, createdDateFromId, comments } = post;
  return (
    <li className=" p-2 rounded-lg flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Image
          src={author.imgUrl || ""}
          alt="author-image"
          width={36}
          height={36}
          className="rounded-full"
        />
        <div className=" flex flex-col ">
          <h2 className="font-bold text-sm">{author.username}</h2>
          <span className="font-thin text-xs">
            {createdDateFromId?.toLocaleString()}
          </span>
        </div>
      </div>
      <article className="text-xs text-black p-4 max-h-24  ">{content}</article>
      <CommentsIndex
        comments={comments || []}
        author={author}
        content={content}
        parentId={post._id}
      />
    </li>
  );
}
