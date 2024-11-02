"use client";
import { useUser } from "@/ui/hooks/useUser";

interface Props {
  children: React.ReactNode;
}
/**
 * A component that renders its children only if the current user has "ADMIN" permission.
 * Use client wrapper to use the useUser.
 *
 * @param children - The content to render if the user is an admin.
 * @returns The children components if the user has admin permissions; otherwise, null.
 */
const ProtectedAdminLink = ({ children }: Props) => {
  const { user } = useUser();

  if (user?.permission !== "ADMIN") return null;

  return <>{children}</>;
};

export default ProtectedAdminLink;
