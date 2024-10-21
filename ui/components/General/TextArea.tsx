import { ITtextAreaProps } from "@/service/models/app.model";

interface Props {
  textAreaProps: ITtextAreaProps;
}
export default function TextArea({ textAreaProps }: Props) {
  const { name } = textAreaProps;
  return (
    <div className={textAreaProps.divStyle}>
      <label className={textAreaProps.labelStyle} htmlFor={name}>
        {textAreaProps.labelText}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={textAreaProps.value}
        required
        autoFocus={true}
        maxLength={textAreaProps.maxLength}
        className={textAreaProps.inputStyle}
        placeholder={textAreaProps.placeholder}
      />
    </div>
  );
}
