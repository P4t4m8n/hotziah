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
