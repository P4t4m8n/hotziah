
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
}

export interface ITtextAreaProps extends IInputProps {
  maxLength?: number;
}

export interface ISelectSingleProps extends IInputProps {
  options: readonly string[];
}

export interface IEntity {
  id?: string;
}


