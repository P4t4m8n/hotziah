import { ISelectSingleProps } from "@/service/models/app.model";

interface Props {
  textAreaProps: ISelectSingleProps;
}

export default function SelectSingle({ textAreaProps }: Props) {
  const { divStyle, labelStyle, inputStyle, labelText, name, value, options } =
    textAreaProps;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={name}>
        {labelText}
      </label>
      <select
        className={inputStyle}
        id={name}
        name={name}
        defaultValue={value}
        required
      >
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
