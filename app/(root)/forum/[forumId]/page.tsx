import { getForumById } from "@/service/server/forum.server";
import { forumService } from "@/service/service/forum.service";
import ForumDetailsIndex from "@/ui/components/Forum/ForumDetails/ForumDetailsIndex";

export async function generateStaticParams() {
  return [{ forumId: "1" }];
}
/**
 * Server-side function to fetch and display forum details.
 *
 * @param {Props} params - The parameters object containing the forum ID.
 * @returns {JSX.Element} The forum details component with the fetched forum data.
 *
 * This function fetches the forum details based on the provided forum ID.
 * If the forum ID is "1", it returns an empty forum to prevent props error.
 * Otherwise, it fetches the forum details using the `getForumById` function.
 */

export default async function ForumDetailsServer({
  params,
}: {
  params: Promise<{ forumId: string }>;
}) {
  const { forumId } = await params;

  let forum = forumService.getEmpty();

  if (forumId !== "1") {
    forum = await getForumById(forumId);
  }

  return <ForumDetailsIndex forum={forum} />;
}
