import { IForumDetails } from "@/service/models/forum.model";

import ForumDetailsActions from "./ForumDetailsActions";
import ForumDetailsHeader from "./ForumDetailsHeader";
import ForumDetailsThreads from "./ForumDetailsThreads";

interface Props {
  forum: IForumDetails;
}

export default function ForumDetailsIndex({ forum }: Props) {
  const { name, description, threads, type, admins, _id } = forum;

  return (
    <div className="p-8 h-full">
      <ForumDetailsHeader name={name} type={type} />
      <ForumDetailsActions
        description={description}
        admins={admins}
        _id={_id}
      />
      <ForumDetailsThreads threads={threads} />
    </div>
  );
}
