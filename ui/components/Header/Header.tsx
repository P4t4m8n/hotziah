import { APP_LINKS } from "@/service/constants/Links";
import { LogoSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";

import UserMenu from "../User/UserMenu";

export default function Header() {
  return (
    <header className=" flex w-full border-b-2 h-20 p-4 px-4">
      <Link className="w-12 h-12" href={"/"}>
        <LogoSvg />
      </Link>
      <nav className=" flex w-full justify-around  ">
        {APP_LINKS.map((link) => (
          <Link
            className=" items-center flex flex-col w-12 h-12"
            key={link.url}
            href={link.url}
          >
            {link.icon}
            <span className="text-xs font-semibold">{link.name}</span>
          </Link>
        ))}
      </nav>
      <UserMenu />
    </header>
  );
}
