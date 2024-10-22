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

export interface FetchOptions<TBody> {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
  queryParams?: Record<string, string | number | boolean>;
}

export interface INavLinksProps {
  link: string;
  text?: string;
  svg?: React.ReactNode;
  linkStyle: string;
}
