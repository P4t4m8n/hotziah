import ProtectedAdminLink from "@/ui/guards/ProtectedLink";
import { PlusSvg } from "@/ui/Icons/Svgs";
import GeneralLink from "../../General/GeneralLink";
import Filter from "../../General/Filter/Filter";

/**
 * ForumIndexActions component renders the header section of the forum index page.
 * It includes a search input, a category select dropdown, and a search button.
 * Additionally, it provides a fixed button for creating a new forum, which is only
 * accessible to admin users.
 *
 * @returns {JSX.Element} The rendered header section with search functionality and admin link.
 */
interface Props {
  taxonomies: Record<TTaxonomyName, string[]>;
}
const ForumIndexActions = ({ taxonomies }: Props) => {
  const forumFilterItems: TFilterItem[] = [
    {
      type: "text",
      name: "Name",
      placeHolder: "Enter forum title",
      labelText: "Title",
    },
    {
      type: "multiSelect",
      name: "subject",
      labelText: "Subjects",
      placeHolder: "Select subjects",
      options: taxonomies.subjects,
    },

    {
      type: "range",
      name: "uniqueView",
      placeHolder: "Minimum unique views",
      labelText: "Unique Views",
    },
    {
      type: "select",
      name: "sortBy",
      labelText: "Sort By",
      options: ["createdAt", "updatedAt", "uniqueView", "asc", "desc"],
    },
  ];
  return (
    <header className="h-fit px-4  mb-4 flex justify-between">
      <Filter items={forumFilterItems} route="forum" />
      <div className=" fixed bottom-24 right-8">
        <ProtectedAdminLink>
          <GeneralLink
            href={"/forum/edit/new"}
            text={"NEW FORUM"}
            svg={<PlusSvg />}
          />
        </ProtectedAdminLink>
      </div>
    </header>
  );
};

export default ForumIndexActions;
