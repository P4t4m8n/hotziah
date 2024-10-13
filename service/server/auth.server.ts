"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IUser, IUserDto } from "../models/user.model";
import { createSession, removeSession } from "./session.server";
import { handleError } from "../util/error.util";
import { getCollection } from "../db/mongo";
import { userServer } from "./user.server";

export const login = async (userDto: IUserDto): Promise<IUser> => {
  try {
    const { email, password } = userDto;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const collection = await getCollection<IUserDto>("users");
    const user = await collection.findOne({ email });

    if (!user || !user.password || !user._id) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid credentials");
    }

    return await _processUser(user);
  } catch (error) {
    throw handleError(error, "Error logging in");
  }
};

export const signup = async (userDto: IUserDto): Promise<IUser> => {
  try {
    const saltRounds = 10;

    if (!userDto.email || !userDto.password) {
      throw new Error("Email and password are required");
    }
    const collection = await getCollection<IUserDto>("users");
    const existingUser = await collection.findOne({ email: userDto.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hash = await bcrypt.hash(userDto.password, saltRounds);

    const { insertedId } = await collection.insertOne({
      ...userDto,
      password: hash,
    });

    if (!insertedId) {
      throw new Error("Error creating user");
    }

    return await _processUser({ ...userDto, _id: insertedId });
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

    const { acknowledged } = await removeSession(session.value);
    if (!acknowledged) {
      throw new Error("Error removing session");
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

    const user = await userServer.get({ _id: decoded.userId });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw handleError(err, "Error getting session user");
  }
};

const _processUser = async (user: IUserDto): Promise<IUser> => {
  delete user.password;
  const sessionToken = await createSession(user._id!.toString());

  cookies().set("session", sessionToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    httpOnly: true,
    sameSite: "strict",
  });

  return { ...user, _id: user._id!.toString() };
};
