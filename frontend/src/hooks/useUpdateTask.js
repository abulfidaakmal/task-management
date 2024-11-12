import { useState } from "react";
import { toast } from "sonner";

export const useUpdateTask = () => {
  const [isPending, setIsPending] = useState(false);

  const request = async (idTask, values) => {
    setIsPending(true);

    const { success, message } = await fetch(
      import.meta.env.VITE_API_URL + `/${idTask}`,
      {
        method: "PUT",
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
  };

  return { request, isPending };
};
