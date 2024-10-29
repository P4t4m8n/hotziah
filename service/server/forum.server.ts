import { prisma } from "@/prisma/prismaClient";
import { IForum, IForumDto, IForumFilter } from "../models/forum.model";
import { handleError } from "./util/error.util";
import { forumService } from "../service/forum.service";

/**
 * Saves a forum based on the provided forum data.
 * If the forum data has an ID, updates the existing forum; otherwise, creates a new forum.
 * @param formDto - The forum data to be saved
 * @returns The saved forum data
 */
export const saveForum = async (formDto: IForumDto): Promise<IForum> => {
  return formDto.id ? updateForum(formDto) : createForum(formDto);
};
/**
 * Retrieves forums based on the provided filter criteria.
 *
 * @param filter - The filter criteria to apply when querying forums.
 * Filter by - ID,Name, title, subject, type
 * Skip and take are used for pagination
 * @returns A promise that resolves to an array of forums matching the filter criteria.
 * @throws An error if no forums are found.
 */
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

    if (!forums.length) {
      throw new Error("No forums found");
    }

    return forums;
  } catch (error) {
    throw handleError(error, "Error querying forums in forum.server.ts");
  }
};
/**
 * Retrieves a forum by its unique identifier.
 *
 * @param id - The unique identifier of the forum to retrieve.
 * @returns A Promise that resolves to the forum object.
 * @throws Error if the forum with the specified id is not found.
 */
export const getForumById = async (id: string): Promise<IForum> => {
  try {
    const forum = await prisma.forum.findUnique({
      where: { id },
      select: forumService.buildSql(),
    });

    if (!forum) {
      throw new Error("Forum not found");
    }

    return forum;
  } catch (error) {
    throw handleError(error, "Error in getForum service");
  }
};
/**
 * Creates a new forum based on the provided forumDto.
 *
 * @param forumDto - The forum data to create the forum with.
 * @returns The newly created forum.
 * @throws Error if there is an issue creating the forum.
 */
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
/**
 * Updates a forum in the database with the provided data.
 *
 * @param forum - The forum data to be updated.
 * @returns The updated forum object.
 * @throws Error if there is an issue updating the forum.
 */
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
/**
 * Removes a forum from the database.
 *
 * @param id - The unique identifier of the forum to remove.
 * @returns A boolean indicating whether the forum was successfully removed.
 * @throws Error if there is an issue removing the forum.
 */
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
