import { IThread } from "@/service/models/thread.model";
import Link from "next/link";

interface Props {
  threads: IThread[];
}

export default function ForumDetailsThreads({ threads }: Props) {
  return (
    <div className="px-6 h-forum-details-threads w-full overflow-auto no-scrollbar ">
      <header className="grid grid-cols-3 gap-4 border-b py-2 pb-4 text-platinum h-12">
        <h1 className="font-semibold text-left">TOPIC</h1>
        <h1 className="font-semibold text-left">LATEST POST</h1>
        <h1 className="font-semibold text-right">POSTS</h1>
      </header>

      <nav className=" h-forum-details-list w-full test no-scrollbar">
        {threads.map((thread) => (
          <Link
            href={`/forum/${thread.forumId}/thread/${thread._id}`}
            key={thread._id}
            className="grid grid-cols-3 gap-4 p-2 py-4 rounded-lg shadow-sm border-b last:border-b-0 hover:shadow-xl hover:scale-[1.005] hover:-translate-y-2 transition-all duration-300"
          >
            <h2 className="text-left font-bold">{thread.name}</h2>
            <h2 className="text-left">{"bla bla Yesterday, 17:10"}</h2>
            <h2 className="text-right">{thread.numOfPosts}</h2>
          </Link>
        ))}
      </nav>
    </div>
  );
}
