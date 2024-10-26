interface Props {
  input: TInput;
  value?: string;
}

export default function TherapistEditInput({ input, value }: Props) {

  const { type, placeHolder, name, label } = input;

  return (
    <div key={name} className="flex">
      <label className="w-24 block" htmlFor={name}>
        {label}:
      </label>
      <input
        type={type}
        placeholder={placeHolder}
        name={name}
        className="bg-slate-700 px-2 py-1 rounded-md"
        required
        autoComplete={"new-password"}
        defaultValue={value}
      />
    </div>
  );
}
