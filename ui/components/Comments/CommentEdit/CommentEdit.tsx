"use client";

import { IComment } from "@/service/models/comments.model";
import { FormEvent, useRef } from "react";
import Input from "../../General/Input";
import FormBtn from "../../General/FormBtn";

interface Props {
  comment: IComment;
  onSubmit: (comment: IComment) => void;
}

export default function CommentEdit({ comment, onSubmit }: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const input = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    inputStyle: "bg-slate-100 rounded-lg p-1 px-6",
    name: "content",
    value: comment.content,
  };

  const formBts = {
    containerStyle: "flex justify-between px-4",
    cancelBtnStyle: "bg-platinum text-blue font-semibold  p-1 px-2 rounded-lg",
    submitBtnStyle: "bg-orange text-blue font-semibold  p-1 px-2 rounded-lg",
    cancelAction: () => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
      }
    },
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const content = e.currentTarget.content.value;
    onSubmit({ ...comment, content });
  };

  return (
    <div>
      <label
        htmlFor="comment-toggle"
        className="cursor-pointer bg-blue-500 text-white p-2 rounded-lg"
      >
        Add a comment
      </label>
      <input
        type="checkbox"
        id="comment-toggle"
        ref={checkboxRef}
        className="sr-only peer"
      />
      <form onSubmit={onSubmitForm} className="mt-4 hidden peer-checked:block">
        <Input inputProps={input} />
        <FormBtn {...formBts} />
      </form>
    </div>
  );
}
