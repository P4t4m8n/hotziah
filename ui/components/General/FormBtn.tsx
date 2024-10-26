"use client";

import { useFormStatus } from "react-dom";
import Loader from "./Loader";

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
  const { pending } = useFormStatus();
  return (
    <div className={containerStyle}>
      <button
        disabled={pending}
        onClick={() => cancelAction(false)}
        className={cancelBtnStyle}
      >
        {cancelText || "CANCEL"}
      </button>
      {pending && <Loader />}
      <button disabled={pending} type="submit" className={submitBtnStyle}>
        {submitText || "ADD POST"}
      </button>
    </div>
  );
}
