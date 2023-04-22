import { useContext, useEffect } from "react";
import { toastContext } from "../../context/ToastContext";

const Toast = () => {
  const { toastStack, setToastStack } = useContext(toastContext);

  useEffect(() => {
    if (toastStack.length === 0) return;
    toastStack.forEach((toast) => {
      const toastElement = document.createElement("div");
      if (toast.type === "success") toastElement.classList.add("Toast-success");
      if (toast.type === "error") toastElement.classList.add("Toast-error");
      toastElement.innerHTML = toast.message;
      const countdown = document.createElement("div");
      countdown.classList.add("Toast-progress-bar");
      toastElement.appendChild(countdown);
      const toaster = document.getElementById("Toaster");
      toaster.appendChild(toastElement);
      setTimeout(() => {
        toastElement.remove();
      }, 3000);
    });

    setToastStack([]);

    return () => {};
  }, [toastStack]);

  return <div className="" id="Toaster"></div>;
};

export default Toast;
