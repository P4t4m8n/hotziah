import { IPost } from "@/service/models/post.model";
import { getPostBtId } from "@/service/server/post.server";
import PostDetails from "@/ui/components/Posts/PostDetails";

export async function generateStaticParams() {
  return [{ postId: "1" }];
}

export default async function PostDetailsServer({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const post: IPost = await getPostBtId(postId);

  return <PostDetails post={post} />;
}
