export const LOGIN_INPUTS: TInputUserForm[] = [
  {
    type: "text",
    placeHolder: "אימייל",
    name: "email",
    label: "אימייל",
  },
  {
    type: "password",
    placeHolder: "סיסמא",
    name: "password",
    label: "סיסמא",
  },
];

export const SIGN_UP_INPUTS: TInputUserForm[] = [
  {
    type: "text",
    placeHolder: "שם משתמש",
    name: "username",
    label: "שם משתמש",
  },
  {
    type: "text",
    placeHolder: "שם פרטי",
    name: "firstName",
    label: "שם פרטי",
  },
  {
    type: "text",
    placeHolder: "שם משפחה",
    name: "lastName",
    label: "שם משפחה",
  },
  ...LOGIN_INPUTS,
];
