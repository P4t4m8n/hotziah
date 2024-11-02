import { IPost } from "@/service/models/post.model";

import PostInfo from "./PostInfo";
import CommentUser from "@/ui/components/CommentIndex/CommentUser";
import PostHeader from "./PostHeader";

/**
 * DetailedPostComponent is a React functional component that displays detailed information about a post.
 *
 * @param {Props} props - The properties object.
 * @param {Object} props.post - The post data to be displayed.
 * @param {string} props.post.title - The title of the post.
 * @param {string} props.post.author - The author of the post.
 * @param {string} props.post.content - The content of the post.
 * @param {Object} props.post._count - The count object containing various counts related to the post.
 * @param {number} props.post._count.uniqueView - The number of unique views of the post.
 * @param {Date} props.post.createdAt - The creation date of the post.
 * @param {Date} props.post.updatedAt - The last updated date of the post.
 * @param {Array} props.post.comments - The list of comments on the post.
 * @param {Array} props.post.tags - The list of tags associated with the post.
 *
 * @returns {JSX.Element} The JSX code to render the detailed post component.
 */
interface Props {
  post: IPost;
}
const DetailedPostComponent = ({ post }: Props) => {
  if (!post) {
    //TODO: replace with actual error handling
    return <div>Error: Post data is missing.</div>;
  }
  const { title, author, content, _count, createdAt, updatedAt, comments } =
    post;

  return (
    <div className="w-full sm:w-4/5 h-fit relative">
      <div className="bg-purple text-white pl-24 pt-8 p-4 rounded-lg flex flex-col gap-8">
        <PostHeader title={title} createdAt={createdAt} updatedAt={updatedAt} />
        <CommentUser author={author} isPost />
        <article className="text-pretty font-semibold text-black h-36 overflow-auto no-scrollBar">
          {content}
        </article>
        <PostInfo
          numOfComments={comments?.length ?? 0}
          tags={post.tags}
          views={_count?.uniqueView ?? 0}
        />
      </div>
    </div>
  );
};

export default DetailedPostComponent;
