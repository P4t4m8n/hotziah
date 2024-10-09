import { APP_LINKS } from "@/service/constants/Links";
import { LogoSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";
import React from "react";
import GeneralMenu from "../Menus/GeneralMenu";
import { USER_MENU_ITEMS } from "@/service/constants/menuItem";

export default function Header() {
  return (
    <header className=" flex w-full shadow-sm h-28 p-4 bg-slate-100">
      <Link className="w-16 h-16" href={"/"}>
        <LogoSvg />
      </Link>
      <nav className=" flex w-full justify-around  ">
        {APP_LINKS.map((link) => (
          <Link
            className=" items-center flex flex-col"
            key={link.url}
            href={link.url}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
      <GeneralMenu menuItems={USER_MENU_ITEMS} />
    </header>
  );
}
