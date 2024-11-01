import { useUser } from "@/ui/hooks/useUser";

interface Props {
  authorId?: string;
  children: React.ReactNode;
}
export default function ProtectedAuthor({ authorId, children }: Props) {
  const { user } = useUser();

  if (!user || user.permission !== "ADMIN" || authorId !== user.id) return null;
  return <>{children}</>;
}
