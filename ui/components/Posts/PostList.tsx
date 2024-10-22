import { IPost } from "@/service/models/post.model";
import PostPreview from "./PostPreview";
interface Props {
  posts: IPost[];
}
export default function PostsList({ posts }: Props) {
  return (
    <nav className=" h-forum-details-list w-full no-scrollbar">
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </nav>
  );
}
