"use client";

import { IPost } from "@/service/models/posts.model";
import PostList from "./b";
import { Fragment, useRef, useState } from "react";
import { useModel } from "@/ui/hooks/useModel";
import TextArea from "../General/TextArea";
import PostEdit from "./PostEdit/PostEdit";
import { IUser } from "@/service/models/user.model";

interface Props {
  comments: IPost[];
  author: IUser;
  content: string;
  parentId?: string;
}
export default function CommentsIndex({
  comments,
  author,
  content,
  parentId,
}: Props) {
  const [commentsState, setCommentsState] = useState(comments);
  const formRef = useRef<HTMLDivElement>(null);
  const [isForumModelOpen, setIsForumModelOpen] = useModel(formRef);

  return (
    <Fragment>
      <button
        onClick={() => setIsForumModelOpen(true)}
        className=" bg-slate-100 text-xs font-semibold rounded-lg p-2 mr-6  self-end"
      >
        Reply
      </button>

      {isForumModelOpen && (
        <div
          className=" fixed z-10 right-0 top-24 w-96 h-post-edit bg-blue rounded-lg p-4"
          ref={formRef}
        >
          <header className="flex gap-4 items-center">
            <button
              onClick={() => setIsForumModelOpen(false)}
              className="bg-platinum rounded-full w-8 h-8"
            >
              X
            </button>
            <h1 className="text-white text-sm font-semibold">{`Comment on ${author.username} post`}</h1>
          </header>
          <PostEdit
            setCommentsState={setCommentsState}
            setIsForumModelOpen={setIsForumModelOpen}
            parentId={parentId}
          />
        </div>
      )}
      {commentsState?.length > 0 && <PostList posts={commentsState} />}
    </Fragment>
  );
}
