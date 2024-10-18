"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/prisma/prismaClient";

import { cookies } from "next/headers";

import { handleError } from "../util/error.util";
import { userServer, userService } from "./user.server";
import { IUser, IUserDto } from "../models/user.model";

export const login = async (userDto: IUserDto): Promise<IUser> => {
  try {
    const { email, password } = userDto;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const userSql = userService.buildSql();
    userSql.password = true;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: userSql,
    });

    if (!user || !user.password || !user.id) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid credentials");
    }

    delete (user as { password?: string }).password;

    return user;
  } catch (error) {
    throw handleError(error, "Error logging in");
  }
};

export const signup = async (userDto: IUserDto): Promise<IUser> => {
  try {
    const saltRounds = 10;

    if (!userDto.email || !userDto.password || !userDto.username) {
      throw new Error(" Email, password and username are required");
    }
    const users = await prisma.user.findMany({
      where: {
        email: userDto.email,
        username: userDto.username,
      },
    });
    if (users.length) {
      throw new Error("User already exists");
    }

    const hash = await bcrypt.hash(userDto.password, saltRounds);
    const userSql = userService.buildSql();

    const user = await prisma.user.create({
      data: {
        ...userDto,
        password: hash,
      },
      select: userSql,
    });

    if (!user) {
      throw new Error("Error creating user");
    }

    return user;
  } catch (error) {
    throw handleError(error, "Error signing up");
  }
};

export const logout = async (): Promise<void> => {
  try {
    const session = cookies().get("session");
    if (!session) {
      throw new Error("No session found");
    }

    cookies().set("session", "", {
      expires: new Date(0),
    });
  } catch (error) {
    throw handleError(error, "Error logging out");
  }
};

export const getSessionUser = async (): Promise<IUser | null> => {
  const token = cookies().get("session");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token.value) as { userId: string };
    if (!decoded || !decoded.userId) return null;

    const user = await userServer.get(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw handleError(err, "Error getting session user");
  }
};
