"use client";

import { IComment } from "@/service/models/comments.model";
import { FormEvent, useEffect, useState } from "react";

import { BackSvg } from "@/ui/Icons/Svgs";

import FormBtn from "../../General/FormBtn";
import TextArea from "../../General/TextArea";

interface Props {
  submitComment: (comment: IComment) => void;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comment: IComment;
  modelRef: React.RefObject<HTMLFormElement>;
  isModelOpen?: boolean;
}

export default function CommentEdit({
  submitComment,
  setIsModelOpen,
  comment,
  modelRef,
  isModelOpen,
}: Props) {
  //To prevent animation of first load
  //TODO find a better way to do this too many renders
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isModelOpen) {
      setHasInteracted(true);
    }
  }, [isModelOpen]);

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
    cancelAction: () => setIsModelOpen(false),
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const content = e.currentTarget.content.value || "";

    submitComment({ ...comment, content });
    setIsModelOpen(false);

    e.currentTarget.reset();
  };

  return (
    <>
      <button onClick={() => setIsModelOpen((prev) => !prev)}></button>
      {hasInteracted && (
        <form
          ref={modelRef}
          onSubmit={onSubmitForm}
          className={` bg-slate-400 fixed right-0 top-20 w-[35vw] z-30  h-main-height p-4 ${
            isModelOpen ? "animate-slideInRight" : "animate-slideOutRight"
          }`}
        >
          <header className="flex gap-4 items-center">
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                setIsModelOpen(false);
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
