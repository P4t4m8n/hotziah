import { IPost } from "@/service/models/post.model";
import { savePost } from "@/service/server/post.server";
import { handleError } from "@/service/server/util/error.util";
import { redirect } from "next/navigation";
import Input from "../../General/Input";
import TextArea from "../../General/TextArea";
import PostEditActions from "./PostEditActions";

interface Props {
  post: IPost;
}

export default function PostEdit({ post }: Props) {
  const input = {
    divStyle: "flex flex-col gap-2 p-2 px-4 text-3xl font-semibold",
    labelStyle: "font-sm",
    inputStyle:
      " bg-inherit rounded-lg p-1 px-6 text-xl text-black placeholder:text-gray-800 border border-blue",
    name: "title",
    placeholder: "Subject",
    value: post.title,
  };

  const textArea = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    labelStyle: "font-medium",
    inputStyle:
      " bg-inherit rounded-lg font-semibold p-1 px-6 h-24 resize-none border border-blue",
    name: "content",
    value: post.content,
    maxLength: 255,
  };

  const onSubmit = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const postToSave = {
      ...post,
      title,
      content,
    };

    const _post = await savePost(postToSave);
    if (_post) {
      redirect(`/forum/${_post.forumId}/post/${_post.id}`);
    } else {
      handleError(_post, "Error saving post in post.edit.page.tsx");
    }
  };

  return (
    <div className=" w-full h-full p-4 flex gap-8 ">
      <form
        action={onSubmit}
        className=" bg-dark-blue text-white h-full w-[55%] max-w-96 min-w-64 p-8 rounded-lg flex flex-col gap-8"
      >
        <Input inputProps={input} />

        <TextArea textAreaProps={textArea} />

        <PostEditActions forumId={post.forumId} postId={post.id} />
      </form>
    </div>
  );
}
