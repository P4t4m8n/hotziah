import { IPost } from "@/service/models/post.model";
import { getPostBtId } from "@/service/server/post.server";
import PostDetailsClient from "@/ui/components/Posts/PostDetails/PostDetailsClient";

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

  return <PostDetailsClient post={post} />;
}
