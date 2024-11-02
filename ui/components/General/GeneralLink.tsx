import Link from "next/link";

interface Props {
  href: string;
  text: string;
  svg: React.ReactNode;
}

const GeneralLink = ({ href, text, svg }: Props) => {
  return (
    <Link className="link" href={href}>
      {svg}
      <p>{text}</p>
    </Link>
  );
};

export default GeneralLink;
