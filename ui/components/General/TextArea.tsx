import { ITtextAreaProps } from "@/service/models/app.model";

interface Props {
  textAreaProps: ITtextAreaProps;
}
export default function TextArea({ textAreaProps }: Props) {
  const {
    divStyle,
    labelStyle,
    inputStyle,
    labelText,
    name,
    value,
    maxLength,
  } = textAreaProps;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={name}>
        {labelText}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={value}
        required
        maxLength={maxLength}
        className={inputStyle}
      />
    </div>
  );
}
