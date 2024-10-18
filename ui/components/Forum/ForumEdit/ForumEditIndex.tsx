import { IUser } from "@/service/models/user.model";
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
import { FORUM_TYPE, IForum } from "@/service/models/forum.model";
import { ForumType } from "@prisma/client";

interface Props {
  forum: IForum;
  admins: IUser[];
}
export default function ForumEditIndex({ forum, admins }: Props) {
  const input: IInputProps = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    labelStyle: "font-medium",
    inputStyle: "bg-slate-100 rounded-lg p-1 px-6",
    labelText: "Forum Name",
    name: "name",
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
    options: FORUM_TYPE,
    value: forum.type,
  };

  return (
    <form
      className="flex flex-col gap-4 w-forum-edit h-full p-4 shadow-xl rounded-lg m-4 self-center"
      action={saveForum}
    >
      <h1 className="text-4xl font-semibold">Create Forum</h1>

      <Input inputProps={input} />

      <TextArea textAreaProps={textArea} />

      <SelectSingle textAreaProps={selectProps} />

      <ForumEditAdmins admins={admins} forumAdmins={forum.admins} />

      <ForumEditActions />
    </form>
  );
}
