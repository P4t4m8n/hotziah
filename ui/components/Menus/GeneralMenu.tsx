"use client";

import { IMenu } from "@/service/models/menu.model";
import { useModel } from "@/ui/hooks/useModel";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef } from "react";

interface Props {
  menuItems: IMenu;
}

export default function GeneralMenu({ menuItems }: Props) {
  const handleClick = (e: MouseEvent, onClick: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
    onClick();
  };
  const modelRef = useRef(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  const { iconSvg, imgUrl, text, style } = menuItems.menuBtn;
  return (
    <div className=" relative" ref={modelRef}>
      <button
        className={style}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {iconSvg && iconSvg}
        {imgUrl && (
          <Image
            src={imgUrl}
            width={32}
            height={32}
            alt={text || "menu button"}
          />
        )}
        <span>{text && text.charAt(0).toUpperCase() + text.slice(1)}</span>
      </button>
      <ul
        className={`${isOpen ? "flex" : "hidden"} ${
          menuItems.menuStyle
        } bg-white shadow-md flex-col p-4 right-2/3 rounded-md w-full absolute`}
      >
        {menuItems.items.map((item, idx) => (
          <li key={idx}>
            {item.onClick && (
              <button
                className={item.style}
                onClick={(e) => handleClick(e, item.onClick!)}
              >
                <span>{item.text}</span>
                {item.iconSvg && item.iconSvg}
                {item.imgUrl && (
                  <Image
                    src={item.imgUrl}
                    width={32}
                    height={32}
                    alt={item.text || "menu function"}
                  />
                )}
              </button>
            )}
            {item.link && (
              <Link href={item.link} className={item.style}>
                <span>{item.text}</span>
                {item.iconSvg && item.iconSvg}
                {item.imgUrl && (
                  <Image
                    src={item.imgUrl}
                    width={32}
                    height={32}
                    alt={item.text || "menu link"}
                  />
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
