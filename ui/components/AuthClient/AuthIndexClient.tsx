"use client";
import { LOGIN_INPUTS, SIGN_UP_INPUTS } from "@/service/constants/formInputs";
import { formDataToUserDTO } from "@/service/util/auth.util";
import { useUser } from "@/ui/hooks/useUser";
import { FormEvent, useState } from "react";
import AuthForm from "./AuthForm";

interface Props {
  isLogin: boolean;
}
export default function AuthIndexClient({ isLogin }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signUp } = useUser();

  const onSubmitForm = async (ev: FormEvent) => {
    try {
      ev.preventDefault();
      setIsLoading(true);

      const userDto = formDataToUserDTO(ev.target as HTMLFormElement);
      if (isLogin) {
        await login(userDto);
      } else {
        await signUp(userDto);
      }
    } catch (error) {
      console.info("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = isLogin ? LOGIN_INPUTS : SIGN_UP_INPUTS;

  return (
    <div className="flex flex-col items-center p-4 gap-8">
      <header className="">{isLogin ? "Login" : "Sign-Up"}</header>

      <AuthForm
        inputs={inputs}
        onSubmitForm={onSubmitForm}
        isLoading={isLoading}
        isLogin={isLogin}
      />
    </div>
  );
}
