"use client";

import { IComment } from "@/service/models/comments.model";
import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import FormBtn from "../../General/FormBtn";
import TextArea from "../../General/TextArea";
import { BackSvg } from "@/ui/Icons/Svgs";

interface Props {
  comment: IComment;
  onSubmit: (comment: IComment) => void;
  isCommentEditOpen: boolean;
  modelRef: RefObject<HTMLFormElement>;
  setIsCommentEditOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CommentEdit({
  comment,
  onSubmit,
  modelRef,
  isCommentEditOpen,
  setIsCommentEditOpen,
}: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);
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
    setIsCommentEditOpen(false);
  };

  return (
    <>
      {hasInteracted && (
        <form
          ref={modelRef}
          onSubmit={onSubmitForm}
          className={` bg-slate-400 fixed right-0 top-20 w-[35vw]  h-main-height p-4 ${
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
