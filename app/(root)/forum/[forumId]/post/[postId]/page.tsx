import { getPostById } from "@/service/server/post.server";
import { postService } from "@/service/service/post.service";
import PostDetailsClient from "@/ui/components/Posts/PostDetails/PostDetailsClient";

export async function generateStaticParams() {
  return [{ postId: "1", forumId: "1" }];
}

/**
 * Server-side function to fetch and display post details.
 *
 * @param {Object} params - The parameters object.
 * @param {Promise<{ postId: string; forumId: string }>} params.params - A promise that resolves to an object containing the postId and forumId.
 *
 * @returns {JSX.Element} The PostDetailsClient component with the fetched post data.
 *
 * This function fetches the post details based on the provided postId. If the postId is "1", it returns an empty post to prevent props error. Otherwise, it fetches the post details from the server.
 */
export default async function PostDetailsServer({
  params,
}: {
  params: Promise<{ postId: string; forumId: string }>;
}) {
  const { postId } = await params;

  let post = postService.getEmpty("1");
  if (postId !== "1") {
    post = await getPostById(postId);
  }

  return <PostDetailsClient post={post} />;
}
