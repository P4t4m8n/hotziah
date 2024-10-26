export const LOGIN_INPUTS: TInput[] = [
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
    autoComplete: "current-password",
  },
];

export const SIGN_UP_INPUTS: TInput[] = [
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

export const THERAPIST_SIGN_UP_INPUTS: TInput[] = [
  ...SIGN_UP_INPUTS,
  {
    type: "tel",
    name: "phone",
    label: "Phone",
    placeHolder: "Phone",
  },
];

export const ADDRESS_INPUTS: TInput[] = [
  {
    name: "city",
    type: "text",
    label: "City",
    placeHolder: "City",
  },
  {
    name: "street",
    type: "text",
    label: "Street",
    placeHolder: "Street",
  },
  {
    name: "number",
    type: "text",
    label: "Number",
    placeHolder: "Number",
  },
  {
    name: "zipCode",
    type: "text",
    label: "Zip Code",
    placeHolder: "Zip Code",
  },
  {
    name: "entrance",
    type: "text",
    label: "Entrance",
    placeHolder: "Entrance",
  },
  {
    name: "floor",
    type: "text",
    label: "Floor",
    placeHolder: "Floor",
  },
];
