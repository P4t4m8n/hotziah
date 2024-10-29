"use client";

import { ReactNode, MouseEvent } from "react";

interface Props {
  children: ReactNode;
}
/**
 * Component that wraps children components with a click handler to stop event propagation.
 * @param children - The child components to be wrapped.
 */
export default function ClientBtnWrapper({ children }: Props) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return <div onClick={handleClick}>{children}</div>;
}
