import { ISelectSingleProps } from "@/service/models/app.model";

interface Props {
  selectProps: ISelectSingleProps;
}

export default function SelectSingle({ selectProps }: Props) {
  const { divStyle, labelStyle, inputStyle, labelText, name, value, options } =
  selectProps;
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
