"use client";
import { IPost } from "@/service/models/post.model";

import Input from "../../General/Input";
import TextArea from "../../General/TextArea";
import PostEditActions from "./PostEditActions";
import { FormEvent } from "react";
import { useUser } from "@/ui/hooks/useUser";
import { apiClientService } from "@/service/client/api.client";
import { useRouter } from "next/navigation";
import CheckboxList from "../../General/CheckboxList";

interface Props {
  post: IPost;
  tags: string[];
}

export default function PostEdit({ post, tags }: Props) {
  const user = useUser().user;
  const router = useRouter();

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let savedPost: IPost | null = null;
    try {
      const formData = new FormData(e.currentTarget);
      const dataToSanitize = {
        title: formData.get("title")?.toString() || "",
        content: formData.get("content")?.toString() || "",
        tags: formData.getAll("tags").map((tag) => tag.toString()) || [],
      };
      console.log("dataToSanitize:", dataToSanitize)

      const postToSave: PostToSave = {
        authorId: user!.id!,
        forumId: post.forumId,
        dataToSanitize: dataToSanitize,
      };

      if (post?.id) {
        savedPost = await apiClientService.put<IPost>(
          `post/${post.id}`,
          postToSave
        );
      } else {
        savedPost = await apiClientService.post<IPost>(`post`, postToSave);
      }
      router.push(`/forum/${savedPost.forumId}/post/${savedPost.id}`);
      console.log("savedPost:", savedPost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full h-full p-4 flex gap-8 ">
      <form
        onSubmit={onSubmit}
        className=" bg-dark-blue text-white h-full w-[55%] max-w-96 min-w-64 p-8 rounded-lg flex flex-col gap-8"
      >
        <Input inputProps={input} />

        <TextArea textAreaProps={textArea} />

        <CheckboxList
          list={tags}
          checkAgainst={post.tags}
          title="tags"
          name="tags"
        />

        <PostEditActions forumId={post.forumId} postId={post.id} />
      </form>
    </div>
  );
}
