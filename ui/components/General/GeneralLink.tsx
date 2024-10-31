import Link from "next/link";

interface Props {
  href: string;
  text: string;
  svg: React.ReactNode;
}

export default function GeneralLink({ href, text, svg }: Props) {
  return (
    <Link  href={href}>
      {svg}
      <p>{text}</p>
    </Link>
  );
}
