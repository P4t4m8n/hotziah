"use server";

import { DeleteResult, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { getCollection } from "../db/mongo";
import { ISession } from "../models/session.model";
import { cryptr } from "../lib/cryptr";
import { handleError } from "../util/error.util";
import { ONE_DAY_IN_SECONDS } from "../services/session.service";

export const createSession = async (userId: string): Promise<string> => {
  try {
    const collection = await getCollection("sessions");
    const secretKey = process.env.JWT_SECRET;

    const expiresAt = Math.floor(Date.now() / 1000) + ONE_DAY_IN_SECONDS;
    const token = jwt.sign({ userId }, secretKey!, {
      expiresIn: ONE_DAY_IN_SECONDS,
    });

    await collection.insertOne({
      userId: new ObjectId(userId),
      expiresAt: new Date(expiresAt * 1000),
      token,
    });

    return token;
  } catch (error) {
    throw handleError(error, "Error creating session");
  }
};

export const validateSession = async (
  token: string
): Promise<ISession | null> => {
  const decrypted = cryptr.decrypt(token);
  const sessionData = JSON.parse(decrypted);

  const collection = await getCollection("sessions");
  const session = await collection.findOne<ISession>({
    _id: sessionData._id,
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await removeSession(token);
    return null;
  }

  return session;
};

export const removeSession = async (token: string): Promise<DeleteResult> => {
  const collection = await getCollection("sessions");
  return await collection.deleteOne({
    token,
  });
};
