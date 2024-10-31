"use client";

import { IComment } from "@/service/models/comments.model";
import { FormEvent, RefObject, useEffect, useState } from "react";

import { BackSvg } from "@/ui/Icons/Svgs";

import FormBtn from "../../General/FormBtn";
import TextArea from "../../General/TextArea";

interface Props {
  submitComment: (comment: IComment) => void;
  setIsCommentEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comment: IComment;
  isCommentEditOpen: boolean;
  modelRef: RefObject<HTMLFormElement>;
}

export default function CommentEdit({
  submitComment,
  setIsCommentEditOpen,
  comment,
  isCommentEditOpen,
  modelRef,
}: Props) {
  //To prevent animation of first load
  //TODO find a better way to do this to many renders
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isCommentEditOpen) {
      setHasInteracted(true);
    }
  }, [isCommentEditOpen]);

  const textArea = {
    divStyle: "flex flex-col gap-2 p-2 px-4 h-2/3",
    inputStyle:
      "bg-slate-100 rounded-lg p-2 px-6 resize-none h-full text-black  ",
    name: "content",
    value: comment.content,
    maxLength: 255,
    placeholder: "Add a comment",
  };

  const formBts = {
    containerStyle: "flex justify-between px-4",
    cancelBtnStyle:
      " bg-platinum text-sm font-semibold rounded-md flex gap-2 h-6 w-20 p-2 px-4 items-center justify-center",
    submitBtnStyle:
      "bg-orange text-sm font-semibold rounded-md flex text-black gap-2 h-6 w-28 p-2 px-4 items-center justify-center",
    cancelAction: () => setIsCommentEditOpen(false),
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const content = e.currentTarget.content.value || "";

    submitComment({ ...comment, content });
    setIsCommentEditOpen(false);

    e.currentTarget.reset();
  };

  return (
    <>
      {hasInteracted && (
        <form
          ref={modelRef}
          onSubmit={onSubmitForm}
          className={` bg-slate-400 fixed right-0 top-20 w-[35vw] z-30  h-main-height p-4 ${
            isCommentEditOpen ? "animate-slideInRight" : "animate-slideOutRight"
          }`}
        >
          <header className="flex gap-4 items-center">
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                setIsCommentEditOpen(false);
              }}
            >
              <BackSvg />
            </button>
            <h2 className="text-blue font-bold text-lg">Add a comment</h2>
          </header>
          <TextArea textAreaProps={textArea} />
          <FormBtn {...formBts} />
        </form>
      )}
    </>
  );
}
