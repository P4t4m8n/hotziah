import { IPost } from "@/service/models/post.model";
import { getPostById } from "@/service/server/post.server";

import { getTaxonomies } from "@/service/server/taxonomy.server";
import { postService } from "@/service/service/post.service";

import PostEdit from "@/ui/components/Posts/PostEdit/PostEdit";

export async function generateStaticParams() {
  return [{ postId: "new", forumId: "1" }];
}

export default async function PostEditServer({
  params,
}: {
  params: Promise<{ postId: string; forumId: string }>;
}) {
  const { postId, forumId } = await params;
  let post: IPost;
  if (postId === "new") {
    post = postService.getEmpty(forumId);
  } else {
    post = await getPostById(postId);
  }

  const tags = await getTaxonomies({ name: "postTags" });

  return <PostEdit post={post} tags={tags.postTags} />;
}
