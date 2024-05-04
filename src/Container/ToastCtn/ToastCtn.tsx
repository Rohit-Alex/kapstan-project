import { ToastContainer } from "react-toastify";

const ToastCtn = () => {
  return (
    <ToastContainer
      closeOnClick
      className="toaster"
      draggable
      theme="colored"
    />
  );
};

export default ToastCtn;
