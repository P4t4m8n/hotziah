import { formatDate } from "@/service/client/util/app.util";
import { IComment } from "@/service/models/comments.model";
import Image from "next/image";

interface Props {
  comment: IComment;
}
export default function CommentItem({ comment }: Props) {
  const { content, author } = comment;
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
          <h2 className="font-bold text-sm">{comment.author.username}</h2>
          <span className="font-thin text-xs">
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
      <article className="text-xs text-black p-4 max-h-24  ">{content}</article>
    </li>
  );
}
