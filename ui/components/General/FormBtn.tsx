interface Props {
  cancelAction: (...args: unknown[]) => void;
  containerStyle?: string;
  cancelBtnStyle?: string;
  submitBtnStyle?: string;
  cancelText?: string;
  submitText?: string;
}
export default function FormBtn({
  cancelAction,
  containerStyle,
  cancelBtnStyle,
  submitBtnStyle,
  cancelText,
  submitText,
}: Props) {
  return (
    <div className={containerStyle}>
      <button onClick={() => cancelAction(false)} className={cancelBtnStyle}>
        {cancelText || "CANCEL"}
      </button>
      <button type="submit" className={submitBtnStyle}>
        {submitText || "ADD POST"}
      </button>
    </div>
  );
}
