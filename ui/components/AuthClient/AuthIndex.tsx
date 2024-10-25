import { LOGIN_INPUTS, SIGN_UP_INPUTS } from "@/service/constants/formInputs";
import AuthForm from "./AuthFormClient";

interface Props {
  isLogin: boolean;
}
export default function AuthIndex({ isLogin }: Props) {
  const inputs = isLogin ? LOGIN_INPUTS : SIGN_UP_INPUTS;

  return (
    <div className="flex flex-col items-center p-4 gap-8">
      <header className="">{isLogin ? "Login" : "Sign-Up"}</header>

      <AuthForm inputs={inputs} isLogin={isLogin} />
    </div>
  );
}
