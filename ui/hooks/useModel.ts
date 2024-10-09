import { Dispatch, SetStateAction, useEffect, useState } from "react";
export const useModel = (
  ref: React.RefObject<Element>,
  callBack?: null | (() => void)
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ref.current || !open) return;

    const checkClickOutside = (ev: MouseEvent) => {
      if (!ev.target) return;
      if (!open) return;
      if (ref.current?.contains(ev.target as Node)) return;

      if (callBack) {
        callBack();
        return;
      }
      setOpen(false);
    };

    const checkKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("click", checkClickOutside);
    document.addEventListener("keydown", checkKeyPress);
    return () => {
      document.removeEventListener("click", checkClickOutside);
      document.removeEventListener("keydown", checkKeyPress);
    };
  }, [open, ref, callBack]);

  return [open, setOpen];
};
