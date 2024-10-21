import { useEffect, useRef } from "react";

export const useEffectRender = (
  callBack: () => void,
  dependencies: unknown[]
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callBack();
  }, dependencies);
};
