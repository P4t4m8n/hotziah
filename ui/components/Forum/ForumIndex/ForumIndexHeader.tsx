import { PlusSvg, SearchSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";

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
      <Link
        className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
        href={`/forum/edit/new`}
      >
        <PlusSvg />
        <h4 className="text-xs font-bold text-blue">NEW TOPIC</h4>
      </Link>
    </header>
  );
}
