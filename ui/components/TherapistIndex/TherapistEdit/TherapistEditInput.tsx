interface Props {
  name: string;
  placeHolder?: string;
  type: "text" | "email" | "tel" | "password";
  labelText?: string;
  value?: string | number;
}

export default function TherapistEditInput({
  name,
  placeHolder,
  type,
  labelText,
  value,
}: Props) {
  return (
    <div key={name} className="flex">
      <label className="w-24 block" htmlFor={name}>
        {labelText}:
      </label>
      <input
        type={type}
        placeholder={placeHolder}
        name={name}
        className="bg-slate-700 px-2 py-1 rounded-md"
        required
        defaultValue={value}
      />
    </div>
  );
}
