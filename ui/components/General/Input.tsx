import { IInputProps } from "@/service/models/app.model";

interface Props {
  inputProps: IInputProps;
}
export default function Input({ inputProps }: Props) {
  const { divStyle, labelStyle, inputStyle, labelText, name, value } =
    inputProps;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={name}>
        {labelText}
      </label>
      <input
        id={name}
        type="text"
        name={name}
        defaultValue={value}
        required
        className={inputStyle}
      />
    </div>
  );
}
