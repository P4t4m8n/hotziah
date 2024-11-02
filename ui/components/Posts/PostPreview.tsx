import { formatDate } from "@/service/client/util/app.util";
import { IPost } from "@/service/models/post.model";
import Link from "next/link";
import PostPinBtn from "./PostPinBtn";
import { memo } from "react";
/**
 * A memoized functional component that renders a preview of a post.
 *
 * @component
 * @param {Props} props - The properties object.
 * @param {Object} props.post - The post object.
 * @param {string} props.post.title - The title of the post.
 * @param {Object} props.post._count - The count object containing view and comment counts.
 * @param {number} props.post._count.uniqueView - The number of unique views.
 * @param {number} props.post._count.comments - The number of comments.
 * @param {string} props.post.forumId - The ID of the forum.
 * @param {string} props.post.id - The ID of the post.
 * @param {Object} props.post.author - The author object.
 * @param {string} props.post.author.username - The username of the author.
 * @param {string} props.post.content - The content of the post.
 * @param {string} props.post.createdAt - The creation date of the post.
 * @param {boolean} props.post.isPinned - Indicates if the post is pinned.
 *
 * @returns {JSX.Element} The rendered component.
 */
interface Props {
  post: IPost;
}
const PostPreview: React.FC<Props> = memo(
  ({
    post: { title, _count, forumId, id, author, content, createdAt, isPinned },
  }: Props) => {
    const latestPostDate = formatDate(createdAt);

    return (
      <Link
        href={`/forum/${forumId}/post/${id}`}
        className="w-72 h-80 shadow-post-card p-2 flex flex-col rounded-xl hover:shadow-2xl hover:translate-y-1 hover:rounded-lg transition-all duration-300"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-turquoise font-bold text-xl pb-2 line-clamp-3">
            {title}
          </h2>
          <PostPinBtn postId={id!} isPinned={isPinned} forumId={forumId} />
        </div>
        <div className="text-left flex gap-2">
          <h3 className="bg-purple text-white px-3 rounded-2xl">
            {author?.username}
          </h3>
        </div>
        <article className="p-1 px-3 text-base font-semibold h-1/2 line-clamp-6 text-purple">
          {content}
        </article>
        <div className="flex justify-around text-xs mt-auto">
          <span>{_count?.uniqueView} views</span>
          <span>{_count?.comments} comments</span>
          <span className="text-right">{latestPostDate}</span>
        </div>
      </Link>
    );
  }
);

PostPreview.displayName = "PostPreview";
export default PostPreview;
