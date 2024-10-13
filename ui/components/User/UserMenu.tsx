"use client";
import { useUser } from "@/ui/hooks/useUser";
import GeneralMenu from "../Menus/GeneralMenu";
import { IUser } from "@/service/models/user.model";
import { IMenu, IMenuBtn } from "@/service/models/menu.model";
import { AvatarSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";

export default function UserMenu() {
  const { user, logout } = useUser();

  const getUserMenuItems = (user: IUser): IMenu => {
    const menuBtn: IMenuBtn = {
      text: user?.username || "Login",
      style: "",
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
        className="w-16 h-12 bg-black text-white rounded-lg p-4 font-bold flex justify-center items-center"
        href="/login"
      >
        Login
      </Link>
    );
  }
  return <GeneralMenu menuItems={menuItems!} />;
}
