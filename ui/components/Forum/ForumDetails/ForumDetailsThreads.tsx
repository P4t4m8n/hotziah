import { IThreadDetails } from "@/service/models/thread.model";
import ThreadsList from "./ThreadsList";

interface Props {
  threads: IThreadDetails[];
}

export default function ForumDetailsThreads({ threads }: Props) {
  return (
    <div className="px-6 h-forum-details-threads w-full overflow-auto no-scrollbar ">
      <header className="grid grid-cols-3 gap-4 border-b py-2 pb-4 text-platinum h-12">
        <h1 className="font-semibold text-left">TOPIC</h1>
        <h1 className="font-semibold text-left">LATEST POST</h1>
        <h1 className="font-semibold text-right">POSTS</h1>
      </header>

      <ThreadsList threads={threads} />
    </div>
  );
}
