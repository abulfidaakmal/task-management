import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      richColors
      position="top-center"
      toastOptions={{
        closeButton: true,
        duration: 3000,
      }}
    />
  );
};

export default Toaster;
