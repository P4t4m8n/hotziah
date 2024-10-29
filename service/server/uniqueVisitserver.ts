import { prisma } from "@/prisma/prismaClient";
import { ViewType } from "@prisma/client";
import { handleError } from "./util/error.util";

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
export async function updateUniqueVisit(
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
