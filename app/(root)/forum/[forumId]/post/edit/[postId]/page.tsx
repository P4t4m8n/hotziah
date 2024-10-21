import { redirect } from "next/navigation";

import { IPost } from "@/service/models/post.model";
import { IUser } from "@/service/models/user.model";

import { getSessionUser } from "@/service/server/auth.server";
import { getPostBtId } from "@/service/server/post.server";
import { postService } from "@/service/service/post.service";

import PostEdit from "@/ui/components/Posts/PostEdit/PostEdit";

export async function generateStaticParams() {
  return [{ postId: "new", forumId: "1" }];
}
export default async function PostEditServer({
  params,
}: {
  params: { postId: string; forumId: string };
}) {
  const { postId, forumId } = params;

  //Fetch session user for author object
  //TODO redirect will be moved to middleware with permission level check
  const user: IUser | null = await getSessionUser();
  if (!user) return redirect("/login");

  let post: IPost;
  if (postId === "new") {
    post = postService.getEmptyEntity(user, forumId);
  } else {
    post = await getPostBtId(postId);
  }

  return <PostEdit post={post} />;
}
