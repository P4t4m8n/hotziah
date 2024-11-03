import { getForums } from "@/service/server/forum.server";
import { getTaxonomies } from "@/service/server/taxonomy.server";
import ForumIndex from "@/ui/components/Forum/ForumIndex/ForumIndex";

/**
 * The main server-side function for the forum index page.
 *
 * This function fetches the list of forums and renders the `ForumIndex` component with the fetched forums.
 *
 * @async
 * @function FormIndexServer
 * @returns {Promise<JSX.Element>} The rendered `ForumIndex` component with the list of forums.
 */
export default async function FormIndexServer(): Promise<JSX.Element> {
  //TODO:Add filter and SearchParams
  const forums = await getForums({});
  const taxonomies = await getTaxonomies({});

  return <ForumIndex forums={forums} taxonomies={taxonomies} />;
}
