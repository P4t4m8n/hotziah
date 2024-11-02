import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
/**
 * Custom hook that manages the state of a modal based on user interactions.
 * @param ref A reference to the modal element
 * @param callBack An optional callback function to execute on specific interactions
 * @returns A tuple containing the modal state and a function to update the state
 */
export const useModel = (
  ref: React.RefObject<Element>,
  callBack?: null | (() => void)
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);
  const eventListenerRef = useRef<{
    click: (ev: MouseEvent) => void;
    keydown: (ev: KeyboardEvent) => void;
  }>({
    click: () => {},
    keydown: () => {},
  });

  const checkClickOutside = useCallback(
    (ev: MouseEvent) => {
      if (!ev.target) return;
      if (!open) return;
      if (!ref.current) return;
      if (ref.current.contains(ev.target as Node)) return;

      if (callBack) {
        callBack();
        return;
      }
      setOpen(false);
    },
    [open, ref, callBack]
  );

  const checkKeyPress = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !open) return;

    const currentEventListeners = eventListenerRef.current;
    currentEventListeners.click = checkClickOutside;
    currentEventListeners.keydown = checkKeyPress;

    document.addEventListener("click", currentEventListeners.click);
    document.addEventListener("keydown", currentEventListeners.keydown);
    return () => {
      document.removeEventListener("click", currentEventListeners.click);
      document.removeEventListener("keydown", currentEventListeners.keydown);
    };
  }, [open, ref, checkClickOutside, checkKeyPress]);

  const memoizedValue: [boolean, Dispatch<SetStateAction<boolean>>] = useMemo(
    () => [open, setOpen],
    [open, setOpen]
  );

  return memoizedValue;
};
