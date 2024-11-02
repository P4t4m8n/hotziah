
export default function NoCommentsSection() {
  return (
    <div className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
      <h1 className="text-3xl font-semibold">No Comments Yet</h1>
      <p className="text-font-size-14 text-platinum px-4 font-semibold">
        Be the first to comment on this post
      </p>
    </div>
  );
}
