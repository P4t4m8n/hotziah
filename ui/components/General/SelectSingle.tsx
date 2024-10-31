import { ISelectSingleProps } from "@/service/models/app.model";

interface Props {
  selectProps: ISelectSingleProps;
  error?: string;
}

export default function SelectSingle({ selectProps, error }: Props) {
  const { divStyle, labelStyle, inputStyle, labelText, name, value, options } =
    selectProps;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={name}>
        <h3>{labelText}</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
