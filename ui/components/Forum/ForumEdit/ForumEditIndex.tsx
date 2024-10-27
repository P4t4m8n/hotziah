"use client";

import { IUserSmall } from "@/service/models/user.model";
import Input from "../../General/Input";
import {
  IInputProps,
  ISelectSingleProps,
  ITtextAreaProps,
} from "@/service/models/app.model";
import ForumEditActions from "./ForumEditActions";
import ForumEditAdmins from "./ForumEditAdmins";
import TextArea from "../../General/TextArea";
import SelectSingle from "../../General/SelectSingle";
import { IForum } from "@/service/models/forum.model";
import ForumEditSubjects from "./ForumEditSubjects";
import { TTaxonomyName } from "@/service/models/taxonomy.model";
import { apiClientService } from "@/service/client/api.client";
import { redirect } from "next/navigation";

interface Props {
  forum: IForum;
  admins: IUserSmall[];
  taxonomies: Record<TTaxonomyName, string[]>;
}
export default function ForumEditIndex({ forum, admins, taxonomies }: Props) {
  const input: IInputProps = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    labelStyle: "font-medium",
    inputStyle: "bg-slate-100 rounded-lg p-1 px-6",
    labelText: "Forum Title",
    name: "title",
    value: forum.title,
  };

  const textArea: ITtextAreaProps = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    labelStyle: "font-medium",
    inputStyle: "bg-slate-100 rounded-lg p-1 px-6 h-24 resize-none",
    labelText: "Description",
    name: "description",
    value: forum.description,
    maxLength: 255,
  };

  const selectProps: ISelectSingleProps = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    labelStyle: "font-medium",
    inputStyle: "bg-slate-100 rounded-lg p-1 px-6",
    labelText: "Forum Type",
    name: "type",
    options: ["public", "private", "hidden", " restricted", "staff", "support"],
    value: forum.type,
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let _forum: IForum | undefined = undefined;
    try {
      const formData = new FormData(e.currentTarget);
      if (forum.id) {
        _forum = await apiClientService.put(`forum/${forum.id}`, formData);
      } else {
        _forum = await apiClientService.post("forum", formData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (_forum?.id) {
        redirect(`/forum/${_forum?.id}`);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-forum-edit h-post-edit-list overflow-auto no-scrollbar p-4 shadow-xl rounded-lg m-4 self-center"
      onSubmit={onSubmit}
    >
      <h1 className="text-4xl font-semibold">Create Forum</h1>

      <Input inputProps={input} />

      <TextArea textAreaProps={textArea} />

      <SelectSingle selectProps={selectProps} />

      <ForumEditSubjects
        subjects={taxonomies.subjects}
        checkedSubjects={forum.subjects}
      />

      <ForumEditAdmins admins={admins} forumAdmins={forum.admins} />

      <ForumEditActions />
    </form>
  );
}
