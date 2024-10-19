import { IPost } from "@/service/models/post.model";
import { IUser } from "@/service/models/user.model";
// import { getSessionUser } from "@/service/server/auth.server";
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
  const user: IUser = {
    id: "cm2en13g50002m296qa3833q8",
    email: "Colby61@gmail.com",
    username: "Lottie1",
    firstName: "Charlene",
    lastName: "Bode",
    imgUrl: "https://avatars.githubusercontent.com/u/12749130",
    isTherapist: false,
    permission: "ADMIN",
  };
  let post:IPost;
  if (postId === "new") {
    post = postService.getEmptyEntity(user, forumId);
  } else {
    post = await getPostBtId(postId);
  }

  return <PostEdit post={post} />;
}
