import Link from "next/link";

interface Props {
  forumId: string;
  postId?: string;
}

export default function PostEditActions({ forumId, postId }: Props) {
  return (
    <div className=" self-center mt-auto w-full flex gap-4 px-4 justify-end">
      <Link
        href={`/forum/${forumId}${postId ? `/post/${postId}` : ""}`}
        className=" bg-platinum text-sm font-semibold rounded-md flex gap-2 h-6 w-20 p-2 px-4 items-center justify-center "
      >
        CANCEL
      </Link>
      <button
        type="submit"
        className="bg-orange text-sm font-semibold rounded-md flex gap-2 h-6 w-28 p-2 px-4 items-center justify-center "
      >
        ADD POST
      </button>
    </div>
  );
}
