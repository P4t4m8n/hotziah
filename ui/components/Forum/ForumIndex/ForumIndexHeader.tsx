import { PlusSvg, SearchSvg } from "@/ui/Icons/Svgs";
import ProtectedLink from "../../General/ProtectedLink";

export default function ForumIndexHeader() {
  return (
    <header className="h-16 px-4  mb-4 flex justify-between">
      <div className=" border-2 flex rounded-3xl gap-2 p-2  pl-6 h-12 items-center">
        <input type="search" placeholder="search" className=" border-r w-64" />
        <select className="w-24 p-1 "></select>
        <button className="bg-orange w-8 h-8 p-1 rounded-full ml-4">
          <SearchSvg />
        </button>
      </div>
      <ProtectedLink
        href={"/forum/edit/new"}
        text={"NEW FORUM"}
        svg={<PlusSvg />}
      />
    </header>
  );
}
