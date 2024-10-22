"use server";

import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

import { prisma } from "@/prisma/prismaClient";
import { cookies } from "next/headers";
import { handleError } from "./util/error.util";
import { IUser, IUserDto } from "../models/user.model";
import { userService } from "../service/user.service";
import { getUserById } from "./user.server";
import {
  IAddressDto,
  ITherapist,
  ITherapistDto,
} from "../models/therapists.model";

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

    const token = await createJWT(user.id, user.permission);

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

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
      throw new Error("Email, password, and username are required");
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

    const token = await createJWT(user.id, user.permission);

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    delete (user as { password?: string }).password;

    return user;
  } catch (error) {
    throw handleError(error, "Error signing up");
  }
};

export const therapistSignup = async (
  userDto: IUserDto,
  therapistDto: ITherapistDto,
  address: IAddressDto
): Promise<{ user: IUser; therapist: ITherapist }> => {
  try {
    const saltRounds = 10;

    if (!userDto.email || !userDto.password || !userDto.username) {
      throw new Error("Email, password, and username are required");
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

    const data = await prisma.user.create({
      data: {
        ...userDto,
        password: hash,
        therapist: {
          create: {
            ...therapistDto,
            address: {
              create: {
                ...address,
              },
            },
          },
        },
      },
      select: {
        ...userSql,
        therapist: {
          select: {
            id: true,
            subjects: true,
            languages: true,
            meetingType: true,
            address: {
              select: {
                id: true,
                city: true,
                street: true,
                isAccessible: true,
                number: true,
                zipCode: true,
                floor: true,
                entrance: true,
              },
            },
            gender: true,
            phone: true,
            education: true,
          },
        },
      },
    });
    const therapist: ITherapist = data.therapist!;
    delete (data as unknown as { therapist?: ITherapist }).therapist;
    const user: IUser = { ...data };

    return { user, therapist };
  } catch (error) {
    throw handleError(error, "Error signing up");
  }
};

export const logout = async (): Promise<void> => {
  try {
    cookies().set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0),
    });
  } catch (error) {
    throw handleError(error, "Error logging out");
  }
};

export const getSessionUser = async (): Promise<IUser | null> => {
  try {
    const token = cookies().get("session")?.value;

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await getUserById(payload.userId as string);

    return user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

async function createJWT(userId: string, permission: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  return new SignJWT({ userId, permission })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
}
