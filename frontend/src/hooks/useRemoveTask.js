import { useState } from "react";
import { toast } from "sonner";
import { dialog } from "../utils/handleDialog";

export const useRemoveTask = () => {
  const [isPending, setIsPending] = useState(false);

  const request = async (idTask) => {
    setIsPending(true);

    const { success, message } = await fetch(
      import.meta.env.VITE_API_URL + `/${idTask}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((res) => res.json());

    if (success) {
      toast.success(message);
    } else {
      toast.error(message || "something went wrong");
    }

    setIsPending(false);
    dialog("Modal_Remove").close();
  };

  return { request, isPending };
};
