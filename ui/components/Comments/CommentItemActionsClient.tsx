import { BookmarkSvg, CopySvg, LikeSvg } from "@/ui/Icons/Svgs";

interface Props {
  setIsCommentEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentItemActionsClient({
  setIsCommentEditOpen,
}: Props) {
  return (
    <div className="flex gap-2">
      <button className="flex border  px-3 items-center gap-2  rounded-[5rem]">
        <span className="text-xs font-semibold">55</span>
        <LikeSvg />
      </button>

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
