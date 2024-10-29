
declare type TInput = {
  type: "text" | "password" | "email" | "tel";
  placeHolder?: string;
  name: string;
  label?: string;
  autoComplete?: string;
  pattern?: string;
  required?: boolean;
  title?: string;
  inputMode?: "numeric";
};

declare type PostToSave = {
  authorId: string;
  id?: string;
  forumId: string;
  dataToSanitize: {
    title: string;
    content: string;
    tags: string[];
  };
};

declare type TForumEditInputs =
  | "title"
  | "description"
  | "type"
  | "admins"
  | "subjects";

declare type TPostEditInputs =
  | "title"
  | "content"
  | "tags"
  | "forumId"
  | "authorId";
