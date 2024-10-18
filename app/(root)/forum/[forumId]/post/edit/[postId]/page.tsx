import { getSessionUser } from "@/service/server/auth.server";
import { getPostBtId } from "@/service/server/post.server";
import { postService } from "@/service/service/post.service";

export async function generateStaticParams() {
  return [{ postId: "new", forumId: "1" }];
}
export default async function PostEditServer({
  params,
}: {
  params: { postId: string; forumId: string };
}) {
  const { postId, forumId } = params;
  const user = await getSessionUser();
  let post;
  if (postId === "new") {
    post = postService.getEmptyEntity(user, forumId);
  } else {
    post = await getPostBtId(postId);
  }
  console.log("post:", post);
  return;
}
