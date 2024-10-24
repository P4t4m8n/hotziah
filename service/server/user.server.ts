import { prisma } from "@/prisma/prismaClient";
import { IUser, IUserDto, IUserFilter } from "../models/user.model";
import { userService } from "../service/user.service";
import { handleError } from "./util/error.util";

/**
 * Saves a user to the database.
 *
 * @param userDto The user data transfer object.
 * @returns A promise that resolves to the saved user object.
 * @throws An error if there is an issue saving the user.
 */
export const getUsers = async (filter: IUserFilter): Promise<IUser[]> => {
  try {
    //TODO:move sanitization logic to service
    if (!filter || typeof filter !== "object") {
      throw new Error("Invalid filter object");
    }

    const selectSql = userService.buildSql();

    const users = await prisma.user.findMany({
      where: {
        id: filter.id,
        isTherapist: { equals: filter.isTherapist },
        username: { contains: filter.username },
        email: { contains: filter.email },
        permission: { equals: filter.permission },
        firstName: { contains: filter.firstName },
        lastName: { contains: filter.lastName },
      },
      take: filter.take,
      skip: ((filter?.page || 1) - 1) * (filter?.take || 10),
      select: selectSql,
    });

    return users;
  } catch (error) {
    const err = handleError(error, "Error getting users");
    throw err;
  }
};
/**
 * Retrieves a user by their ID from the database.
 *
 * @param id - The ID of the user to retrieve.
 * @returns A Promise that resolves to the user object.
 * @throws Error if the user is not found or if there is an error in the retrieval process.
 */
export const getUserById = async (id: string): Promise<IUser> => {
  const selectSql = userService.buildSql();

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: selectSql,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    const err = handleError(error, "Error getting user by id");
    throw err;
  }
};
/**
 * Updates a user's information in the database.
 *
 * @param user - The partial user object containing the updated information.
 * @returns The updated user object.
 * @throws Error if there is an issue updating the user.
 */
export const updateUser = async (user: Partial<IUserDto>): Promise<IUser> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    });

    return updatedUser;
  } catch (error) {
    const err = handleError(error, "Error updating user");
    throw err;
  }
};

/**
 * Asynchronously removes a user from the database.
 *
 * @param id - The ID of the user to be removed.
 * @returns A Promise that resolves to true if the user is successfully removed, or rejects with an error.
 */
export const removeUser = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    const err = handleError(error, "Error removing user");
    throw err;
  }
};
