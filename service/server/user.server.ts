import { prisma } from "@/prisma/prismaClient";
import {
  IUser,
  IUserDto,
  IUserFilter,
  IUserSelectSql,
  IUserSmallSelectSql,
} from "../models/user.model";
import { handleError } from "../util/error.util";
import { IServiceConfig } from "../models/db.model";

const query = async (filter: IUserFilter): Promise<IUser[]> => {
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

const get = async (id: string): Promise<IUser> => {
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

const update = async (user: IUserDto): Promise<IUser> => {
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

const remove = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw handleError(error, "Error in removeUser service");
  }
};

const toDTO = (user: IUser): IUserDto => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    permission: user.permission,
    isTherapist: user.isTherapist,
    imgUrl: user.imgUrl,
  };
};

const buildSql = (): IUserSelectSql => {
  return {
    id: true,
    username: true,
    email: true,
    firstName: true,
    lastName: true,
    permission: true,
    isTherapist: true,
    imgUrl: true,
  };
};

const buildSmallSql = (): IUserSmallSelectSql => {
  return {
    id: true,
    username: true,
    imgUrl: true,
  };
};

export const userService: IServiceConfig<
  IUser,
  IUserDto,
  IUserSelectSql,
  IUserSmallSelectSql
> = {
  collectionName: "user",
  toDTO,
  buildSql,
  buildSmallSql,
};

export const userServer = {
  query,
  get,
  update,
  remove,
};
