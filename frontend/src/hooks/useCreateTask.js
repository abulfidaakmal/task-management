import { toast } from "sonner";
import { dialog } from "../utils/handleDialog";
import { useState } from "react";

export const useCreateTask = () => {
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const request = async (values) => {
    setIsPending(true);

    const { success, message } = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    }).then((res) => res.json());

    if (success) {
      toast.success(message);
    } else {
      setIsError(true);
      toast.error(message || "something went wrong");
    }

    setIsPending(false);
    dialog("Modal_Add").close();
  };

  return { request, isError, isPending };
};
