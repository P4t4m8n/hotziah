import { IAddress } from "../models/therapists.model";

const getEmpty = (): IAddress => {
  return {
    city: "",
    street: "",
    number: "",
    zipCode: "",
    floor: "",
    isAccessible: false,
  };
};

export const addressService = {
  getEmpty,
};
