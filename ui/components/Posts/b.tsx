import { IPost } from "@/service/models/posts.model";
import PostItem from "./a";

interface Props {
  posts: IPost[];
}
export default function PostList({ posts }: Props) {
  return (
    <ul className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar">
      {posts.map((post) => (
        <PostItem post={post} key={post._id} />
      ))}
    </ul>
  );
}
