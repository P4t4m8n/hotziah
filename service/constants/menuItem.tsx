import { AvatarSvg } from "@/ui/Icons/Svgs";
import { IMenu } from "../models/menu.model";

export const USER_MENU_ITEMS: IMenu = {
  menuBtn: {
    text: "User",
    style: "user-menu-btn",
    iconSvg: <AvatarSvg />,
  },
  items: [
    {
      link: "/login",
      text: "Login",
      style: "user-menu-item",
    },
    {
      link: "/signup",
      text: "Sign-up",
      style: "user-menu-item",
    },
    {
      link: "/logout",
      text: "logout",
      style: "user-menu-item",
    },
  ],
  menuStyle: "",
};
