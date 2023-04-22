import { createContext, useState } from "react";

export const toastContext = createContext();

const ToastContext = ({ children }) => {
  const [toastStack, setToastStack] = useState([]);
  return (
    <toastContext.Provider value={{ toastStack, setToastStack }}>
      {children}
    </toastContext.Provider>
  );
};

export default ToastContext;
