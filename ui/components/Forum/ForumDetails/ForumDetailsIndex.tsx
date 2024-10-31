import { IForum } from "@/service/models/forum.model";

import ForumDetailsActions from "./ForumDetailsActions";
import ForumDetailsHeader from "./ForumDetailsHeader";
import PostsList from "../../Posts/PostList";

interface Props {
  forum: IForum;
}

export default function ForumDetailsIndex({ forum }: Props) {
  const { title, description, posts, type, admins, id } = forum;

  return (
    <div className="p-8 h-full relative">
      {/* <TrackUniqueVisit itemId={id!} route="forum" /> */}
      <ForumDetailsHeader name={title} type={type} />
      <ForumDetailsActions
        description={description}
        admins={admins}
        id={id || ""}
      />
      <PostsList posts={posts} />
    </div>
  );
}
