import { getForumById } from "@/service/server/forum.server";
import { forumService } from "@/service/service/forum.service";
import ForumDetailsIndex from "@/ui/components/Forum/ForumDetails/ForumDetailsIndex";

export async function generateStaticParams() {
  return [{ forumId: "1" }];
}

/**
 * Server-side function to fetch and display forum details based on the provided forum ID.
 *
 * @param {Object} params - The parameters object.
 * @param {Promise<{ forumId: string }>} params.params - A promise that resolves to an object containing the forum ID.
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element displaying the forum details.
 */
export default async function ForumDetailsServer({
  params,
}: {
  params: Promise<{ forumId: string }>;
}): Promise<JSX.Element> {
  const { forumId } = await params;

  let forum = forumService.getEmpty();

  if (forumId !== "1") {
    forum = await getForumById(forumId);
  }

  return <ForumDetailsIndex forum={forum} />;
}
