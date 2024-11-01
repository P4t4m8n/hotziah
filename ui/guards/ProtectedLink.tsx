"use client";
import { useUser } from "@/ui/hooks/useUser";
import GeneralLink from "../components/General/GeneralLink";

interface Props {
  href: string;
  text: string;
  svg: React.ReactNode;
}

export default function ProtectedAdminLink({ href, text, svg }: Props) {
  const user = useUser().user;

  if (!user || user.permission !== "ADMIN") return null;
  return <GeneralLink href={href} text={text} svg={svg} />;
}
