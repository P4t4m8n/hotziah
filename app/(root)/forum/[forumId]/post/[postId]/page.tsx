import { getSessionUser } from "@/service/server/auth.server";
import { getPostBtId } from "@/service/server/post.server";
import { postService } from "@/service/service/post.service";
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

  //Get empty post to prevent props error
  let post = postService.getEmptyEntity(
    { id: "", username: "", imgUrl: "" },
    "1"
  );
  //Only fetch when there is a real ID. temp ID exist for SSG
  if (postId !== "1") {
    const user = await getSessionUser();
    console.log("user:", user)
    post = await getPostBtId(postId, user?.id);
  }

  return <PostDetailsClient post={post} />;
}
