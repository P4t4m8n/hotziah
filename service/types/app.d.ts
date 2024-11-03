
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

declare type TTaxonomyName =
  | "languages"
  | "meetingTypes"
  | "education"
  | "subjects"
  | "forumType"
  | "postTags";

declare type TFilterItem = {
  type:
    | "text"
    | "number"
    | "date"
    | "select"
    | "checkbox"
    | "radio"
    | "range"
    | "multiSelect";
  name: string;
  placeHolder?: string;
  labelText?: string;
  options?: string[];
};
