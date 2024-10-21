"use client";

import { useUser } from "@/ui/hooks/useUser";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface Props {
  inputs: TInputUserForm[];
  isLogin: boolean;
}

export default function AuthForm({ inputs, isLogin }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signUp } = useUser();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      setIsLoading(true);
      if (isLogin) await login(formData);
      else await signUp(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="p4 bg-slate-600 p-4 flex flex-col gap-4 "
      onSubmit={onSubmit}
    >
      {inputs.map((input) => (
        <div key={input.name} className="flex">
          <label className="w-24 block" htmlFor={input.name}>
            <span>{input.label}:</span>
          </label>
          <input
            type={input.type}
            placeholder={input.placeHolder}
            name={input.name}
            className="bg-slate-700"
          />
        </div>
      ))}
      <div className="flex items-center  flex-col">
        <button
          className="bg-slate-200 p-2 rounded-lg"
          disabled={isLoading}
          type="submit"
        >
          {!isLoading ? (
            <span>{!isLogin ? "Sign Up" : "Login"}</span>
          ) : (
            <span>...loading</span>
          )}
        </button>
        <Link className=" border-b-2" href={isLogin ? "/signup" : "/login"}>
          <span>{isLogin ? "Go to Sign-up" : "Go to Login"}</span>
        </Link>
      </div>
    </form>
  );
}
