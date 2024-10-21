import { IPost } from "@/service/models/post.model";
export const dynamic = "force-dynamic";

import { getSessionUser } from "@/service/server/auth.server";
import { getPostBtId } from "@/service/server/post.server";
import { postService } from "@/service/service/post.service";

import PostEdit from "@/ui/components/Posts/PostEdit/PostEdit";

export async function generateStaticParams() {
  return [{ postId: "new", forumId: "1" }];
}

//TODO:find a way to make this page SSG
export default async function PostEditServer({
  params,
}: {
  params: { postId: string; forumId: string };
}) {
  const { postId, forumId } = params;

  let post: IPost;
  if (postId === "new") {
    //Fetch session user for author object
    const user = await getSessionUser();
    post = postService.getEmptyEntity(user!, forumId);
  } else {
    post = await getPostBtId(postId);
  }

  return <PostEdit post={post} />;
}
