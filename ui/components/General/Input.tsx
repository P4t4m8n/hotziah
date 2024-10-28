import { IInputProps } from "@/service/models/app.model";

interface Props {
  inputProps: IInputProps;
  error?: string;
}
export default function Input({ inputProps, error }: Props) {
  console.log("error:", error);
  const {
    divStyle,
    labelStyle,
    inputStyle,
    labelText,
    name,
    value,
    required,
    placeholder,
  } = inputProps;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={name}>
        <h3>{labelText}</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <input
        id={name}
        type="text"
        name={name}
        defaultValue={value}
        required={required}
        className={inputStyle}
        placeholder={placeholder}
      />
    </div>
  );
}
