import { IUser, IUserDto } from "../models/user.model";
import { formDataToUserDTO } from "../util/auth.util";
import { apiClientService } from "./api.client";

const BASE_URL = "auth/";

//TODO: Add validation for user object
const login = async (formData: FormData): Promise<IUser> => {
  try {

    const dto = formDataToUserDTO(formData);

    const user = await apiClientService.post<IUser>(
      BASE_URL + "login",
      dto
    );
    if (!user) {
      throw new Error("No user returned from login");
    }
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

//TODO: Add validation for user object
const signUp = async (formData: FormData): Promise<IUser | undefined> => {
  const dto = formDataToUserDTO(formData);
  return await apiClientService.post<IUser>(BASE_URL + "signup", dto);
};

const logout = async (): Promise<void> => {
  return await apiClientService.post(BASE_URL + "logout");
};

const getSession = async (): Promise<IUser | null> => {
  return await apiClientService.get<IUser | null>(BASE_URL + "session-user");
};

export const authClientService = {
  login,
  signUp,
  logout,
  getSession,
};
