import { BookmarkSvg, CopySvg } from "@/ui/Icons/Svgs";
import LikeBtn from "../../General/LikeBtn";
import { ILike } from "@/service/models/like.model";

interface Props {
  setIsCommentEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  like: Omit<ILike, "user">;
  numOfLikes: number;
}

export default function CommentItemActions({
  setIsCommentEditOpen,
  like,
  numOfLikes,
}: Props) {
  /*
  TODO:
  -Add copy functionality
  -Add bookmark functionality
   */
  return (
    <div className="flex gap-2">
      <LikeBtn like={like} numOfLikes={numOfLikes} />

      <button className="border rounded-full  flex items-center justify-center w-8 h-8">
        <CopySvg />
      </button>
      <button className="border rounded-full  flex items-center justify-center w-8 h-8">
        <BookmarkSvg />
      </button>
      <button
        onClick={() => setIsCommentEditOpen(true)}
        className="flex border p-1 px-3 items-center gap-2 h-8 rounded-[5rem] text-xs font-semibold"
      >
        REPLAY
      </button>
    </div>
  );
}
