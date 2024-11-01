import { useUser } from "@/ui/hooks/useUser";

interface Props {
  children: React.ReactNode;
}
export default function ProtectedAdmin({ children }: Props) {
  const { user } = useUser();

  if (!user || user.permission !== "ADMIN") return null;
  return <>{children}</>;
}
