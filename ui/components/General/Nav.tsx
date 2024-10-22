import { INavLinksProps } from "@/service/models/app.model";
import Link from "next/link";

interface Props {
  links: INavLinksProps[];
  navStyle: string;
}
export default function Nav({ links, navStyle }: Props) {
  return (
    <nav className={navStyle}>
      {links.map((link) => (
        <Link href={link.link} key={link.link} className={link.linkStyle}>
          {link.svg && link.svg}
          <span>{link.text}</span>
        </Link>
      ))}
    </nav>
  );
}
