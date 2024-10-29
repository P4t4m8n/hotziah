import { prisma } from "@/prisma/prismaClient";
import { IForum, IForumDto, IForumFilter } from "../models/forum.model";
import { handleError } from "./util/error.util";
import { forumService } from "../service/forum.service";
import { ViewType } from "@prisma/client";

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
/**
 * creates a unique view record based on the provided parameters.
 * @param viewType - The type of content being viewed.
 * @param contentId - The unique identifier of the content being viewed.
 * @param userId - The unique identifier of the user viewing the content.
 * @param visitorId - The unique identifier of the visitor viewing the content.
 * Throws an error if contentId is missing or both userId and visitorId are missing.
 * UserId and visitorId are mutually exclusive.
 * Uses _buildUniqueViewData to construct uniqueCondition and data objects.
 * Checks if a unique view already exists in the database before creating a new one.
 * Handles errors by logging and rethrowing with a custom message.
 */
export async function updateUniqueView(
  viewType: ViewType,
  contentId: string,
  userId?: string,
  visitorId?: string
) {
  try {
    if (!contentId || (!userId && !visitorId)) {
      throw new Error(
        "Content ID and either userId or visitorId are required."
      );
    }

    const { uniqueCondition, data } = _buildUniqueViewData(
      viewType,
      contentId,
      userId,
      visitorId
    );

    const existingView = await prisma.uniqueView.findFirst({
      where: uniqueCondition,
    });

    if (!existingView) {
      await prisma.uniqueView.create({
        data,
      });
    }
  } catch (error) {
    throw handleError(error, "Error in updateUniqueView service");
  }
}
/**
 * Builds unique view data based on the view type, content ID, user ID, and visitor ID.
 * @param viewType - The type of view (POST, FORUM, ARTICLE).
 * @param contentId - The ID of the content being viewed.
 * @param userId - The ID of the user viewing the content.
 * @param visitorId - The ID of the visitor viewing the content.
 * @returns An object containing unique condition and view data.
 */
const _buildUniqueViewData = (
  viewType: ViewType,
  contentId: string,
  userId?: string,
  visitorId?: string
) => {
  const uniqueCondition = {
    viewType,
    ...(viewType === "POST" ? { postId: contentId } : {}),
    ...(viewType === "FORUM" ? { forumId: contentId } : {}),
    ...(viewType === "ARTICLE" ? { articleId: contentId } : {}),
    ...(userId ? { userId } : { visitorId }),
  };

  const data = {
    viewType,
    ...(viewType === "POST" ? { postId: contentId } : {}),
    ...(viewType === "FORUM" ? { forumId: contentId } : {}),
    ...(viewType === "ARTICLE" ? { articleId: contentId } : {}),
    viewedAt: new Date(),
    ...(userId ? { userId } : { visitorId }),
  };

  return { uniqueCondition, data };
};
