export type TInputUserFormKeys =
  | "email"
  | "username"
  | "password"
  | "firstName"
  | "lastName";

interface IInputBase {
  divStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  labelText?: string;
  name?: string;
  required?: boolean;
  hidden?: boolean;
}

export interface IInputProps extends IInputBase {
  value?: string;
  placeholder?: string;
}
export interface ICheckBoxProps extends IInputBase {
  value?: boolean;
}

export interface ITtextAreaProps extends IInputProps {
  maxLength?: number;
  placeholder?: string;
}

export interface ISelectSingleProps extends IInputProps {
  options: readonly string[];
}

export interface IEntity {
  id?: string;
}

export interface INavLinksProps {
  link: string;
  text?: string;
  svg?: React.ReactNode;
  linkStyle: string;
}
