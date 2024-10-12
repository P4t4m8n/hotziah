import { IUser, IUserDto } from "../models/user.model";
import { apiClientService } from "../util/apiClient.service";

const BASE_URL = "auth/";

//TODO: Add validation for user object
const login = async (user: IUserDto): Promise<IUser | undefined> => {
  return await apiClientService.post<IUser>(BASE_URL + "login", user);
};

//TODO: Add validation for user object
const signUp = async (user: IUserDto): Promise<IUser | undefined> => {
  return await apiClientService.post<IUser>(BASE_URL + "signup", user);
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
