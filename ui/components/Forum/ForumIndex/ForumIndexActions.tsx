import ProtectedAdminLink from "@/ui/guards/ProtectedLink";
import { PlusSvg, SearchSvg } from "@/ui/Icons/Svgs";
import GeneralLink from "../../General/GeneralLink";

/**
 * ForumIndexActions component renders the header section of the forum index page.
 * It includes a search input, a category select dropdown, and a search button.
 * Additionally, it provides a fixed button for creating a new forum, which is only
 * accessible to admin users.
 *
 * @returns {JSX.Element} The rendered header section with search functionality and admin link.
 */
const ForumIndexActions = () => {
  return (
    <header className="h-16 px-4  mb-4 flex justify-between">
      <div className=" border-2 flex rounded-3xl gap-2 p-2  pl-6 h-12 items-center">
        <input type="search" placeholder="search" className=" border-r w-64" />
        <select className="w-24 p-1 "></select>
        <button className="bg-orange w-8 h-8 p-1 rounded-full ml-4">
          <SearchSvg />
        </button>
      </div>
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
