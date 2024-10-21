"use client";

import GeneralMenu from "../Menus/GeneralMenu";
import { IUser } from "@/service/models/user.model";
import { IMenu, IMenuBtn } from "@/service/models/menu.model";
import { AvatarSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";
import { useUser } from "@/ui/hooks/useUser";
import Image from "next/image";

export default function UserMenu() {
  const { user, logout } = useUser();
  const getUserMenuItems = (user: IUser): IMenu => {
    const menuBtn: IMenuBtn = {
      text: user?.username || "Login",
      style:
        "w-32 h-12 border shadow-lg text-blue rounded-lg px-4 font-bold flex justify-center gap-4 items-center flex-row-reverse text-base truncate ",
      imgUrl: user?.imgUrl || "",
    };
    if (!user?.imgUrl) {
      menuBtn.iconSvg = <AvatarSvg />;
    }
    return {
      menuBtn,
      items: [
        {
          text: "logout",
          style: "user-menu-item",
          onClick: logout,
        },
      ],
      menuStyle: "",
    };
  };

  const menuItems = user ? getUserMenuItems(user) : null;

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
