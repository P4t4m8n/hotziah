import { IAddressDto } from "../models/therapists.model";

/**
 * Validates the provided address data transfer object.
 * Checks the city, street, number, zip code, entrance, floor, and isAccessible fields for validity.
 * City and isAccessible are required fields.
 * @param addressDto - The partial address data transfer object to be validated.
 * @returns An array of error messages indicating validation failures.
 */
export const validateAddressDto = (
  addressDto: Partial<IAddressDto>
): string[] => {
  const errors: string[] = [];

  const cityError = _validateCity(addressDto.city || "");
  if (cityError) errors.push(cityError);

  const isAccessibleError = _validateIsAccessible(addressDto.isAccessible);
  if (isAccessibleError) errors.push(isAccessibleError);

  const streetError = _validateOptionalField(addressDto.street, "Street");
  if (streetError) errors.push(streetError);

  const numberError = _validateOptionalField(addressDto.number, "Number");
  if (numberError) errors.push(numberError);

  const zipCodeError = _validateOptionalField(addressDto.zipCode, "Zip Code");
  if (zipCodeError) errors.push(zipCodeError);

  const entranceError = _validateOptionalField(addressDto.entrance, "Entrance");
  if (entranceError) errors.push(entranceError);

  const floorError = _validateOptionalField(addressDto.floor, "Floor");
  if (floorError) errors.push(floorError);

  return errors;
};
/**
 * Validates the city input.
 *
 * @param city - The city to validate.
 * @returns A string with an error message if the city is invalid, otherwise null.
 */
const _validateCity = (city: string): string | null => {
  if (!city || city.trim().length < 2) {
    return "City is required and must be at least 2 characters long.";
  }
  return null;
};
/**
 * Validates an optional field based on specific criteria.
 *
 * @param fieldValue - The value of the field to be validated.
 * @param fieldName - The name of the field being validated.
 * @returns A message indicating any validation errors, or null if the field is valid.
 */
const _validateOptionalField = (
  fieldValue: string | undefined,
  fieldName: string
): string | null => {
  if (fieldValue && fieldValue.trim().length < 1) {
    return `${fieldName} must be at least 1 characters long if provided.`;
  }
  return null;
};
/**
 * Validates the isAccessible field.
 *
 * @param isAccessible - The isAccessible field to validate.
 * @returns A string error message if the isAccessible field is invalid, otherwise null.
 */
const _validateIsAccessible = (isAccessible?: boolean): string | null => {
  if (typeof isAccessible !== "boolean") {
    return "isAccessible must be a boolean value.";
  }
  return null;
};
