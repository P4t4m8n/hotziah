import { ICheckBoxProps } from "@/service/models/app.model";

interface Props {
  checkBoxProps: ICheckBoxProps;
}
export default function CheckBox({ checkBoxProps }: Props) {
  return (
    <div className={checkBoxProps.divStyle}>
      <input
        type="checkbox"
        id={checkBoxProps.name}
        name={checkBoxProps.name}
        defaultChecked={checkBoxProps.value}
        className={checkBoxProps.inputStyle}
      />
      <label htmlFor={checkBoxProps.name}>{checkBoxProps.labelText}</label>
    </div>
  );
}
