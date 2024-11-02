import { Permission } from "@prisma/client";
import { jwtVerify } from "jose";

export const decodeToken = async (token?: string) => {
  if (!token) {
    return { userPermission: "", userId: "" };
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  const userPermission = payload.permission as Permission;
  const userId = payload.userId as string;

  return { userPermission, userId };
};
