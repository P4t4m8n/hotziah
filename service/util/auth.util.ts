import { LOGIN_INPUTS } from "../constants/formInputs";
import { TInputUserFormKeys } from "../models/app.model";
import { IUserDto } from "../models/user.model";

export const getLoginInputs = (
  isLogin: boolean,
  errors: Map<TInputUserFormKeys, string>
) => {
  const inputs = isLogin ? LOGIN_INPUTS.slice(1) : LOGIN_INPUTS;
  return inputs.map((input) => {
    return { ...input, error: errors.get(input.name) };
  });
};

export const formDataToUserDTO = (form: HTMLFormElement): IUserDto => {
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const returnedData: IUserDto = {};
  if (username) returnedData.username = username;
  if (email) returnedData.email = email;
  if (password) returnedData.password = password;
  if (firstName) returnedData.firstName = firstName;
  if (lastName) returnedData.lastName = lastName;

  return returnedData;
};
