"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../models/user.model";
import { authClientService } from "../client/auth.client";
import { useRouter } from "next/navigation";

interface Props {
  user: IUser | null;
  login: (formData: FormData) => Promise<void>;
  signUp: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
}

export const authContext = createContext<Props | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authClientService.getSession();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const login = async (formData: FormData) => {
    try {
      const user = await authClientService.login(formData);
      if (!user) {
        throw new Error("No user returned from login");
      }
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setUser(null);
    }
  };

  const signUp = async (formData: FormData) => {
    try {
      const user = await authClientService.signUp(formData);
      if (!user) {
        throw new Error("No user returned from sign-up");
      }
      setUser(user);
    } catch (error) {
      console.error("Error signing up:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await authClientService.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <authContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </authContext.Provider>
  );
}
