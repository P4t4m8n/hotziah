import { IForum } from "@/service/models/forum.model";

import ForumDetailsActions from "./ForumDetailsActions";
import ForumDetailsHeader from "./ForumDetailsHeader";
import PostsList from "../../Posts/PostList";

/**
 * ForumDetailsIndex component displays the details of a forum including its header, actions, and posts list.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.forum - The forum object containing details to be displayed.
 * @param {string} props.forum.title - The title of the forum.
 * @param {string} props.forum.description - The description of the forum.
 * @param {Array} props.forum.posts - The list of posts in the forum.
 * @param {string} props.forum.type - The type of the forum.
 * @param {Array} props.forum.admins - The list of admins of the forum.
 * @param {string} [props.forum.id] - The optional ID of the forum.
 *
 * @returns {JSX.Element} The rendered ForumDetailsIndex component.
 */
interface Props {
  forum: IForum;
}
const ForumDetailsIndex = ({ forum }: Props) => {
  const { title, description, posts, type, admins, id } = forum;

  return (
    <div className="p-8 h-full relative">
      <ForumDetailsHeader name={title} type={type} />
      <ForumDetailsActions
        description={description}
        admins={admins}
        id={id || ""}
      />
      <PostsList posts={posts} />
    </div>
  );
};

export default ForumDetailsIndex;
