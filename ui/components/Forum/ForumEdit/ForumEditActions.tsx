import Link from "next/link";

export default function ForumEditActions() {
  return (
    <div className="self-center mt-auto w-full flex justify-between">
      <Link
        href="/forum"
        className="bg-platinum rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center "
      >
        Cancel
      </Link>
      <button
        className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center "
        type="submit"
      >
        Save
      </button>
    </div>
  );
}
