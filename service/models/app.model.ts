
export type TInputUserFormKeys =
  | "email"
  | "username"
  | "password"
  | "firstName"
  | "lastName";

export interface IInputProps {
  divStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  labelText?: string;
  name?: string;
  value?: string;
  placeholder?: string;
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

