import { useState } from "react";
import { toast } from "sonner";
import { dialog } from "../utils/handleDialog";

export const useUpdateStatusTask = () => {
  const [isPending, setIsPending] = useState(false);

  const request = async (idTask, values) => {
    setIsPending(true);

    const { success, message } = await fetch(
      import.meta.env.VITE_API_URL + `/${idTask}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      }
    ).then((res) => res.json());

    if (success) {
      toast.success(message);
    } else {
      toast.error(message || "something went wrong");
    }

    setIsPending(false);
    dialog("Modal_Update").close();
  };

  return { request, isPending };
};
