export const LOGIN_INPUTS: TInput[] = [
  {
    type: "text",
    placeHolder: "Email",
    name: "email",
    label: "Email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", // Normal email format
    title: "Please enter a valid email address.",
  },
  {
    type: "password",
    placeHolder: "Password",
    name: "password",
    label: "Password",
    autoComplete: "current-password",
    pattern: "^(?=.*[A-Z])(?=.*\\d).{6,}$", // At least 6 chars, 1 uppercase, 1 number
    required: true,
    title:
      "Password must be at least 6 characters long, contain an uppercase letter and a number.",
  },
];

export const SIGN_UP_INPUTS: TInput[] = [
  {
    type: "text",
    placeHolder: "Username",
    name: "username",
    label: "Username",
    pattern: "^[a-zA-Z0-9]{3,}$", // Only letters and numbers, at least 3 characters
    required: true,
    title:
      "Username must be at least 3 characters long and contain only letters and numbers.",
  },
  {
    type: "text",
    placeHolder: "First name",
    name: "firstName",
    label: "First name",
    required: true,
    title: "First name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
  {
    type: "text",
    placeHolder: "Last name",
    name: "lastName",
    label: "Last name",
    autoComplete: "family-name",
    required: true,
    title: "Last name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
  {
    type: "password",
    placeHolder: "Password",
    name: "password",
    label: "Password",
    autoComplete: "new-password",
    pattern: "^(?=.*[A-Z])(?=.*\\d).{6,}$", // At least 6 chars, 1 uppercase, 1 number
    required: true,
    title:
      "Password must be at least 6 characters long, contain an uppercase letter and a number.",
  },
  {
    type: "text",
    placeHolder: "Email",
    name: "email",
    label: "Email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", // Normal email format
    title: "Please enter a valid email address.",
  },
];

export const THERAPIST_SIGN_UP_INPUTS: TInput[] = [
  ...SIGN_UP_INPUTS,
  {
    type: "tel",
    name: "phone",
    label: "Phone",
    placeHolder: "Phone",
    required: true,
    pattern: "^\\d{3}-\\d{7}$", // Format: xxx-xxxxxxx
    title: "Phone number must be in the format xxx-xxxxxxx.",
    inputMode: "numeric",
  },
];

export const ADDRESS_INPUTS: TInput[] = [
  {
    name: "city",
    type: "text",
    label: "City",
    placeHolder: "City",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
    required: true,
    title: "City must contain at least 2 letters.",
  },
  {
    name: "street",
    type: "text",
    label: "Street",
    placeHolder: "Street",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
    title: "Street must contain at least 2 letters.",
  },
  {
    name: "number",
    type: "text",
    label: "Number",
    placeHolder: "Number",
    pattern: "^[a-zA-Z0-9]{1,}$", // Only letters and numbers, at least 1 character
    title:
      "Number must contain at least 1 character and may include letters or numbers.",
  },
  {
    name: "zipCode",
    type: "text",
    label: "Zip Code",
    placeHolder: "Zip Code",
    pattern: "^[0-9]{5}$", // Only numbers, 5 characters
    title: "Zip Code must be exactly 5 digits.",
  },
  {
    name: "entrance",
    type: "text",
    label: "Entrance",
    placeHolder: "Entrance",
    pattern: "^[a-zA-Z0-9]{1,}$", // Only letters and numbers, at least 1 character
    title:
      "Entrance must contain at least 1 character and may include letters or numbers.",
  },
  {
    name: "floor",
    type: "text",
    label: "Floor",
    placeHolder: "Floor",
    pattern: "^[a-zA-Z0-9]{1,}$", // Only letters and numbers, at least 1 character
    title:
      "Floor must contain at least 1 character and may include letters or numbers.",
  },
];
