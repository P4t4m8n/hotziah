import { IThreadDetails } from "@/service/models/thread.model";
import ThreadsPreview from "./ThreadsPreview";
interface Props {
  threads: IThreadDetails[];
}
export default function ThreadsList({ threads }: Props) {
  return (
    <nav className=" h-forum-details-list w-full test no-scrollbar">
      {threads.map((thread) => (
        <ThreadsPreview thread={thread} key={thread._id} />
      ))}
    </nav>
  );
}
