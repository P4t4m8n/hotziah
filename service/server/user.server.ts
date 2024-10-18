import { prisma } from "@/prisma/prismaClient";
import { IUser, IUserDto, IUserFilter } from "../models/user.model";
import { handleError } from "../util/error.util";
import { userService } from "../service/user.service";

export const getUsers = async (filter: IUserFilter): Promise<IUser[]> => {
  try {
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
      take: filter.amount,
      skip: filter.page,
      select: selectSql,
    });

    return users;
  } catch (error) {
    throw handleError(error, "Error in getUsers service");
  }
};

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
    throw handleError(error, "Error in getUser service");
  }
};

export const updateUser = async (user: IUserDto): Promise<IUser> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    });

    return updatedUser;
  } catch (error) {
    throw handleError(error, "Error in updateUser service");
  }
};

export const removeUser = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw handleError(error, "Error in removeUser service");
  }
};
