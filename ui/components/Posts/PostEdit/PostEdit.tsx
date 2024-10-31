"use client";
import { IPost } from "@/service/models/post.model";

import { usePostEdit } from "@/ui/hooks/usePostEdit";

import Input from "../../General/Input";
import TextArea from "../../General/TextArea";
import PostEditActions from "./PostEditActions";
import CheckboxList from "../../General/CheckboxList";

interface Props {
  post: IPost;
  tags: string[];
}

export default function PostEdit({ post, tags }: Props) {
  const { onSubmit,onRemove, errors, isLoading } = usePostEdit(post.forumId, post.id);

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

  return (
    <div className=" w-full h-full p-4 flex gap-8 ">
      <form
        onSubmit={onSubmit}
        className=" bg-dark-blue text-white h-full w-[55%] max-w-96 min-w-64 p-8 rounded-lg flex flex-col gap-8"
      >
        <Input inputProps={input} error={errors.title} />

        <TextArea textAreaProps={textArea} error={errors.content} />

        <CheckboxList
          list={tags}
          checkAgainst={post.tags}
          title="tags"
          name="tags"
          error={errors.tags}
        />

        <PostEditActions
          forumId={post.forumId}
          postId={post.id}
          isLoading={isLoading}
          onRemove={onRemove}
        />
      </form>
    </div>
  );
}
