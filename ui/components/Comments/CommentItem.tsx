import { formatDate } from "@/service/client/util/app.util";
import { IComment } from "@/service/models/comments.model";
import { ArrowSvg } from "@/ui/Icons/Svgs";
import Image from "next/image";

interface Props {
  comment: IComment;
}
export default function CommentItem({ comment }: Props) {
  console.log("comment:", comment);
  const { content, author, createdAt, _count } = comment;
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
          <span className="font-thin text-xs">{formatDate(createdAt)}</span>
        </div>
      </div>
      <article className="text-xs text-black p-4 max-h-24  ">{content}</article>
      <div className="px-4 flex justify-between">
        <button className="flex gap-1 items-center">
          <span className="font-semibold text-sm">
            {_count?.replies} replies
          </span>
          <ArrowSvg />
        </button>
      </div>
    </li>
  );
}
