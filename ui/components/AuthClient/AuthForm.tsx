import Link from "next/link";

interface Props {
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputs: TInputUserForm[];
  isLogin: boolean;
  isLoading: boolean;
}

export default function AuthForm({
  onSubmitForm,
  inputs,
  isLogin,
  isLoading,
}: Props) {
  return (
    <form
      className="p4 bg-slate-600 p-4 flex flex-col gap-4 "
      onSubmit={onSubmitForm}
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
        <button className="bg-slate-200 p-2 rounded-lg" disabled={isLoading} type="submit">
          {!isLoading ? (
            <span>{!isLogin ? "התחבר" : "הרשם"}</span>
          ) : (
            <span>...loading</span>
          )}
        </button>
        <Link className=" border-b-2" href={isLogin ? "/signup" : "/login"}>
          <span>{isLogin ? "עבור להרשמה" : "עבור להתחברות"}</span>
        </Link>
      </div>
    </form>
  );
}
