"use server";

import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

import { prisma } from "@/prisma/prismaClient";
import { cookies } from "next/headers";
import { handleError } from "./util/error.util";
import { IUser, IUserDto, IUserSelectSql } from "../models/user.model";
import { userService } from "../service/user.service";
import { getUserById } from "./user.server";
import { therapistService } from "../service/therapist.service";
import { redirect } from "next/navigation";

import { sanitizeTherapistSignupForm } from "./util/sanitization.util";
import { validateUserDto } from "../validations/user.validation";
import { validateTherapistDto } from "../validations/therapist.validation";
import { validateAddressDto } from "../validations/address.validation";

export const login = async (userDto: IUserDto): Promise<IUser> => {
  try {
    const { email, password } = userDto;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const userSql = userService.buildSql() as IUserSelectSql & {
      password: boolean;
    };

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
        OR: [{ email: userDto.email }, { username: userDto.username }],
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

export const therapistSignup = async (formData: FormData) => {
  try {
    const saltRounds = 10;

    const { userDto, therapistDto, addressDto } =
      sanitizeTherapistSignupForm(formData);

    const userErrors = validateUserDto(userDto);
    if (userErrors.length) {
      const err = handleError(
        userErrors.join("\n"),
        "Error validating user data"
      );
      throw err;
    }

    const therapistErrors = validateTherapistDto(therapistDto);
    if (therapistErrors.length) {
      const err = handleError(
        therapistErrors.join("\n"),
        "Error validating therapist data"
      );
      throw err;
    }

    const addressErrors = validateAddressDto(addressDto);
    if (addressErrors.length) {
      const err = handleError(
        addressErrors.join("\n"),
        "Error validating address data"
      );
      throw err;
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [{ email: userDto.email }, { username: userDto.username }],
      },
    });
    if (users.length) {
      throw new Error("User already exists");
    }

    const hash = await bcrypt.hash(userDto.password!, saltRounds);
    const userSql = userService.buildSql();

    const data = await prisma.user.create({
      data: {
        ...userDto,
        password: hash,
        permission: "THERAPIST",
        therapist: {
          create: {
            ...therapistDto,
            address: {
              create: {
                ...addressDto,
              },
            },
          },
        },
      },
      select: {
        ...userSql,
        therapist: {
          select: therapistService.buildSql(),
        },
      },
    });

    const token = await createJWT(data.id, data.permission);

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    redirect("/");
  } catch (error) {
    throw handleError(error, "Error signing up");
  }
};
// export const therapistSignup = async (
//   userDto: IUserDto,
//   therapistDto: ITherapistDto,
//   address: IAddressDto
// ): Promise<{ user: IUser; therapist: ITherapist }> => {
//   try {
//     const saltRounds = 10;

//     if (!userDto.email || !userDto.password || !userDto.username) {
//       throw new Error("Email, password, and username are required");
//     }
//     const users = await prisma.user.findMany({
//       where: {
//         email: userDto.email,
//         username: userDto.username,
//       },
//     });
//     if (users.length) {
//       throw new Error("User already exists");
//     }

//     const hash = await bcrypt.hash(userDto.password, saltRounds);
//     const userSql = userService.buildSql();

//     const data = await prisma.user.create({
//       data: {
//         ...userDto,
//         password: hash,
//         permission: "THERAPIST",
//         therapist: {
//           create: {
//             ...therapistDto,
//             address: {
//               create: {
//                 ...address,
//               },
//             },
//           },
//         },
//       },
//       select: {
//         ...userSql,
//         therapist: {
//           select: therapistService.buildSql(),
//         },
//       },
//     });

//     const token = await createJWT(data.id, data.permission);

//     cookies().set("session", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60, // 24 hours
//     });

//     redirect("/");
//   } catch (error) {
//     throw handleError(error, "Error signing up");
//   }
// };

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
