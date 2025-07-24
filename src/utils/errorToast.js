import { toast } from "react-toastify";

export const errorToast = (error) =>
  toast.error(`${error?.message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });