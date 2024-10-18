import { IForum } from "@/service/models/forum.model";
import ForumDetailsActions from "./ForumDetailsActions";
import ForumDetailsHeader from "./ForumDetailsHeader";
import ForumDetailsPosts from "./ForumDetailsPosts";

interface Props {
  forum: IForum;
}

export default function ForumDetailsIndex({ forum }: Props) {
  const { title, description, posts, type, admins, id } = forum;
  console.log("admins:", admins.length)

  return (
    <div className="p-8 h-full">
      <ForumDetailsHeader name={title} type={type} />
      <ForumDetailsActions
        description={description}
        admins={admins}
        id={id || ""}
      />
      <ForumDetailsPosts posts={posts} />
    </div>
  );
}
