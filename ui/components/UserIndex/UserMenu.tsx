"use client";
import Link from "next/link";
import Image from "next/image";

import { IMenu, IMenuBtn, IMenuItem } from "@/service/models/menu.model";
import { useUser } from "@/ui/hooks/useUser";

import GeneralMenu from "../Menus/GeneralMenu";
import { AdminSvg, AvatarSvg, LogoutSvg } from "@/ui/Icons/Svgs";

export default function UserMenu() {
  const { user, logout } = useUser();

  const getUserMenuItems = (): IMenu => {
    const menuBtn: IMenuBtn = {
      text: user?.username,
      style:
        "w-32 h-12 border shadow-lg text-blue rounded-lg px-4 font-bold flex justify-center gap-4 items-center flex-row-reverse text-base truncate ",
      imgUrl: user?.imgUrl || "imgs/avatarDefault.svg",
    };

    const items: IMenuItem[] = [
      {
        text: "PROFILE",
        style:
          " flex justify-between items-center border-b py-1 hover:text-dark-blue hover:font-semibold transition-all duration-300",
        link: "/profile",
        iconSvg: <AvatarSvg />,
      },
      {
        text: "LOGOUT",
        style:
          " flex justify-between items-center  pt-1 hover:text-dark-blue hover:font-semibold transition-all duration-300 w-full",
        onClick: logout,
        iconSvg: <LogoutSvg />,
      },
    ];

    if (user?.permission === "ADMIN") {
      items.splice(1, 0, {
        text: "ADMIN",
        style:
          " flex justify-between items-center border-b py-1 hover:text-dark-blue hover:font-semibold transition-all duration-300",
        link: "/admin",
        iconSvg: <AdminSvg />,
      });
    }

    return {
      menuBtn,
      items,
      menuStyle: "",
    };
  };

  const menuItems = user ? getUserMenuItems() : null;

  if (!user) {
    return (
      <Link
        className="w-36 h-12 border shadow-lg text-blue rounded-lg px-4 font-bold flex justify-center gap-4 items-center    "
        href="/login"
      >
        <span>Login</span>
        <Image
          src="/imgs/avatarDefault.svg"
          width={32}
          height={32}
          alt="avatar"
        />
      </Link>
    );
  }
  return <GeneralMenu menuItems={menuItems!} />;
}
