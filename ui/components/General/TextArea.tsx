import { ITtextAreaProps } from "@/service/models/app.model";

interface Props {
  textAreaProps: ITtextAreaProps;
  error?: string;
}
export default function TextArea({ textAreaProps, error }: Props) {
  const { name } = textAreaProps;
  return (
    <div className={textAreaProps.divStyle}>
      <label className={textAreaProps.labelStyle} htmlFor={name}>
        <h3>{textAreaProps.labelText}</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={textAreaProps.value}
        required
        autoFocus={true}
        maxLength={textAreaProps.maxLength || 255}
        className={textAreaProps.inputStyle}
        placeholder={textAreaProps.placeholder}
      />
    </div>
  );
}
