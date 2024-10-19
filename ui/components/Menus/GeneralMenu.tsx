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
    <div className=" relative w-fit" ref={modelRef}>
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
        {text && text.charAt(0).toUpperCase() + text.slice(1)}
      </button>
      <ul className={`${isOpen ? "block" : "hidden"} ${menuItems.menuStyle}`}>
        {menuItems.items.map((item, idx) => (
          <li key={idx}>
            {item.onClick && (
              <button
                className={item.style}
                onClick={(e) => handleClick(e, item.onClick!)}
              >
                {item.iconSvg && item.iconSvg}
                {item.imgUrl && (
                  <Image
                    src={item.imgUrl}
                    width={32}
                    height={32}
                    alt={item.text || "menu function"}
                  />
                )}
                {item.text}
              </button>
            )}
            {item.link && (
              <Link href={item.link}>
                {item.iconSvg && item.iconSvg}
                {item.imgUrl && (
                  <Image
                    src={item.imgUrl}
                    width={32}
                    height={32}
                    alt={item.text || "menu link"}
                  />
                )}
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
