"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { IUser, IUserDto } from "../models/user.model";
import { authClientService } from "../client/auth.client";

interface Props {
  user: IUser | null;
  login: (user: IUserDto) => Promise<void>;
  signUp: (user: IUserDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const authContext = createContext<Props | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authClientService.getSession();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (userDto: IUserDto) => {
    try {
      const user = await authClientService.login(userDto);
      if (!user) {
        throw new Error("No user returned from login");
      }
      setUser(user);
    } catch (error) {
      console.error("Error logging in:", error);
      setUser(null);
    }
  };

  const signUp = async (userDto: IUserDto) => {
    try {
      const user = await authClientService.signUp(userDto);
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
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <authContext.Provider value={{ user,  login, signUp, logout }}>
      {children}
    </authContext.Provider>
  );
}
