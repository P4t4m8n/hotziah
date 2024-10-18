import { IPost } from "@/service/models/post.model";
import PostsList from "../../Posts/PostList";

interface Props {
  posts: IPost[];
}

export default function ForumDetailsPosts({ posts }: Props) {
  return (
    <div className="px-6 h-forum-details-posts w-full overflow-auto no-scrollbar ">
      <header className="grid grid-cols-4 gap-6 border-b py-2 pb-4 text-platinum h-12">
        <h1 className="font-semibold text-left">TOPIC</h1>
        <h1 className="font-semibold text-left">CREATED BY</h1>
        <h1 className="font-semibold text-left">LATEST POST</h1>
        <h1 className="font-semibold text-right">POSTS</h1>
      </header>

      <PostsList posts={posts} />
    </div>
  );
}
