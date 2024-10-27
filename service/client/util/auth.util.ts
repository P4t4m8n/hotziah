// import { LOGIN_INPUTS } from "../../constants/formInputs";
// import { TInputUserFormKeys } from "../../models/app.model";
import { IUserDto } from "../../models/user.model";

// export const getLoginInputs = (
//   isLogin: boolean,
//   errors: Map<TInputUserFormKeys, string>
// ) => {
//   const inputs = isLogin ? LOGIN_INPUTS.slice(1) : LOGIN_INPUTS;
//   return inputs.map((input) => {
//     return { ...input, error: errors.get(input.name) };
//   });
// };

export const formDataToUserDTO = (formData: FormData): IUserDto => {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const returnedData: IUserDto = {
    email,
    password,
    firstName,
    lastName,
    username,
    imgUrl: "/imgs/avatarDefault.svg",
    isTherapist: false,
    permission: "USER",
  };

  return returnedData;
};
