"use client";

import { IMenu } from "@/service/models/menu.model";
import { useModel } from "@/ui/hooks/useModel";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface Props {
  menuItems: IMenu;
}

export default function GeneralMenu({ menuItems }: Props) {
  const modelRef = useRef(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  const { iconSvg, imgUrl, text, style } = menuItems.menuBtn;
  return (
    <div ref={modelRef}>
      <button className={style!} onClick={() => setIsOpen(!isOpen)}>
        {iconSvg && iconSvg}
        {imgUrl && (
          <Image
            src={imgUrl}
            width={32}
            height={32}
            alt={text || "menu button"}
          />
        )}
        {text}
      </button>
      <ul>
        {menuItems.items.map((item, idx) => (
          <li key={idx} className={item.style}>
            {item.onClick && (
              <button onClick={item.onClick}>
                {" "}
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
