
export const LOGIN_INPUTS: TInputUserForm[] = [
  {
    type: "text",
    placeHolder: "Email",
    name: "email",
    label: "Email",
  },
  {
    type: "password",
    placeHolder: "Password",
    name: "password",
    label: "Password",
  },
];

export const SIGN_UP_INPUTS: TInputUserForm[] = [
  {
    type: "text",
    placeHolder: "Username",
    name: "username",
    label: "Username",
  },
  {
    type: "text",
    placeHolder: "First name",
    name: "firstName",
    label: "First name",
  },
  {
    type: "text",
    placeHolder: "Last name",
    name: "lastName",
    label: "Last name",
  },
  ...LOGIN_INPUTS,
];
