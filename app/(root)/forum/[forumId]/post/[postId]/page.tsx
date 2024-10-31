import { getPostBtId } from "@/service/server/post.server";
import { postService } from "@/service/service/post.service";
import PostDetailsClient from "@/ui/components/Posts/PostDetails/PostDetailsClient";

export async function generateStaticParams() {
  return [{ postId: "1", forumId: "1" }];
}

export default async function PostDetailsServer({
  params,
}: {
  params: Promise<{ postId: string; forumId: string }>;
}) {
  const { postId } = await params;

  //Get empty post to prevent props error
  let post = postService.getEmpty("1");
  //Only fetch when there is a real ID. temp ID exist for SSG
  if (postId !== "1") {
    post = await getPostBtId(postId);
  }

  return <PostDetailsClient post={post} />;
}
