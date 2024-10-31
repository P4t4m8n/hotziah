import Link from "next/link";
import Loader from "../../General/Loader";

interface Props {
  forumId: string;
  onRemove?: (e: React.MouseEvent) => void;
  postId?: string;
  isLoading?: boolean;
}

export default function PostEditActions({
  forumId,
  postId,
  isLoading,
  onRemove,
}: Props) {
  return (
    <div className=" self-center mt-auto w-full flex gap-4 px-4 justify-end">
      <Link
        href={`/forum/${forumId}${postId ? `/post/${postId}` : ""}`}
        className=" bg-platinum text-sm font-semibold rounded-md flex gap-2 h-8 w-20 p-2 px-4 items-center justify-center "
      >
        CANCEL
      </Link>
      {postId && (
        <button onClick={onRemove} className="bg-purple text-sm font-semibold rounded-md flex gap-2 h-8 w-28 p-2 px-4 items-center justify-center ">
          Remove
        </button>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-turquoise text-sm font-semibold rounded-md flex gap-2 h-8 w-28 p-2 px-4 items-center justify-center "
      >
        {isLoading ? <Loader /> : postId ? "Edit" : "Add"}
      </button>
    </div>
  );
}
