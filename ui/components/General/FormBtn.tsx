
interface Props {
  cancelAction: (...args: unknown[]) => void;
  containerStyle?: string;
  cancelBtnStyle?: string;
  submitBtnStyle?: string;
}
export default function FormBtn({
  cancelAction,
  containerStyle,
  cancelBtnStyle,
  submitBtnStyle,
}: Props) {
  return (
    <div className={containerStyle}>
      <button onClick={() => cancelAction(false)} className={cancelBtnStyle}>
        CANCEL
      </button>
      <button type="submit" className={submitBtnStyle}>
        ADD POST
      </button>
    </div>
  );
}
