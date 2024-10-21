"use client";
import { useUser } from "@/ui/hooks/useUser";
import Link from "next/link";

interface Props {
  href: string;
  text: string;
  svg: React.ReactNode;
}

export default function ProtectedBtn({ href, text, svg }: Props) {
  const user = useUser().user;

  if (!user || user.permission !== "ADMIN") return null;
  return (
    <Link
      className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
      href={href}
    >
      {svg}
      <h4 className="text-xs font-bold text-blue">{text}</h4>
    </Link>
  );
}
