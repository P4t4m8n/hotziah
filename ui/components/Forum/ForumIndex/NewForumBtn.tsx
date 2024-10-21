'use client'
import { useUser } from "@/ui/hooks/useUser";
import { PlusSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";

export default function NewForumBtn() {
  const user = useUser().user;

  if (!user || user.permission !== "ADMIN") return null;
  return (
    <Link
      className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
      href={`/forum/edit/new`}
    >
      <PlusSvg />
      <h4 className="text-xs font-bold text-blue">NEW TOPIC</h4>
    </Link>
  );
}
