declare type TInput = {
  type: "text" | "password" | "email" | "tel";
  placeHolder?: string;
  name: string;
  label?: string;
  autoComplete?: "current-password" | "new-password";
};
