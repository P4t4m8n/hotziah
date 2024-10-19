import { authContext } from "@/service/context/AuthProvider";
import { useContext } from "react";

export function useUser() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
