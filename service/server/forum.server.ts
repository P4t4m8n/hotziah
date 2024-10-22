"use server";

import { prisma } from "@/prisma/prismaClient";
import { IForum, IForumDto, IForumFilter } from "../models/forum.model";
import { handleError } from "./util/error.util";
import { ForumSubject, ForumType } from "@prisma/client";
import { forumService } from "../service/forum.service";
import { redirect } from "next/navigation";

export const saveForum = async (formData: FormData): Promise<void> => {
  const forumToSave: IForumDto = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as ForumType,
    subjects: formData.getAll("subjects") as ForumSubject[],
    admins: formData.getAll("admins") as string[],
  };

  if (forumToSave.id) {
    await updateForum(forumToSave);
  } else {
    await createForum(forumToSave);
  }

  redirect("/forum");
};

export const getForums = async (filter: IForumFilter): Promise<IForum[]> => {
  try {
    const forums = await prisma.forum.findMany({
      where: {
        id: filter.id,
        title: { contains: filter.title },
        subjects: filter.subject ? { hasSome: filter.subject } : undefined,
        type: { equals: filter.type },
      },
      select: forumService.buildSmallSql(),
      take: filter.take,
      skip: filter.skip,
    });
    if (!forums) throw new Error("No forums found");

    return forums;
  } catch (error) {
    throw handleError(error, "Error querying forums in forum.server.ts");
  }
};

export const getForumById = async (id: string): Promise<IForum> => {
  try {
    const forum = await prisma.forum.findUnique({
      where: { id },
      select: forumService.buildSql(),
    });
    if (!forum) throw new Error("Forum not found");

    return forum;
  } catch (error) {
    throw handleError(error, "Error in getForum service");
  }
};

export const createForum = async (forumDto: IForumDto): Promise<IForum> => {
  try {
    const newForum = await prisma.forum.create({
      data: {
        title: forumDto.title,
        description: forumDto.description,
        type: forumDto.type,
        subjects: forumDto.subjects,
        admins: {
          connect: forumDto.admins.map((adminId) => ({ id: adminId })),
        },
      },
      select: forumService.buildSql(),
    });

    return newForum;
  } catch (error) {
    throw handleError(error, "Error in createForum service");
  }
};

export const updateForum = async (forum: IForumDto): Promise<IForum> => {
  try {
    const updatedForum = await prisma.forum.update({
      where: { id: forum.id },
      data: {
        title: forum.title,
        description: forum.description,
        type: forum.type,
        subjects: forum.subjects,
      },
      select: forumService.buildSql(),
    });

    return updatedForum;
  } catch (error) {
    throw handleError(error, "Error in updateForum service");
  }
};

export const removeForum = async (id: string): Promise<boolean> => {
  try {
    await prisma.forum.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw handleError(error, "Error in removeForum service");
  }
};
