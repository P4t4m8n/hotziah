import { APP_LINKS } from "@/service/constants/links";
import { LogoSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";

import UserMenu from "../UserIndex/UserMenu";
import Nav from "../General/Nav";

export default async function Header() {
  return (
    <header className=" flex w-full border-b-2 h-20 p-4 px-4">
      <Link className="w-12 h-12" href={"/"}>
        <LogoSvg />
      </Link>
      <Nav links={APP_LINKS} navStyle="flex w-[calc(100%-10rem)] justify-around" />

      <UserMenu />
    </header>
  );
}
