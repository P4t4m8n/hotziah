import React, { useRef, useEffect } from "react";

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.classList.add("show-toast");
      setTimeout(() => {
        toastRef.current?.classList.remove("show-toast");
      }, 3000);
    }
  }, [message]);

  return (
    <div
      ref={toastRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-red-500 text-white rounded shadow-lg transition-opacity duration-300 opacity-0"
    >
      {message}
    </div>
  );
};

export default Toast;
