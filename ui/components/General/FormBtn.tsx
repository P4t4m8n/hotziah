'use client'

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
    <div
      className={
        containerStyle +
        " self-center mt-auto w-full flex gap-4 px-4 justify-end"
      }
    >
      <button
        onClick={() => cancelAction(false)}
        className={
          cancelBtnStyle +
          " bg-platinum text-sm font-semibold rounded-md flex gap-2 h-6 w-20 p-2 px-4 items-center justify-center "
        }
      >
        CANCEL
      </button>
      <button
        type="submit"
        className={
          submitBtnStyle +
          "bg-orange text-sm font-semibold rounded-md flex gap-2 h-6 w-28 p-2 px-4 items-center justify-center "
        }
      >
        ADD POST
      </button>
    </div>
  );
}
