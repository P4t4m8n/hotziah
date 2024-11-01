import { useUser } from "@/ui/hooks/useUser";

interface Props {
  children: React.ReactNode;
}
export default function ProtectedUser({ children }: Props) {
  const { user } = useUser();

  if (!user) return null;
  return <>{children}</>;
}
