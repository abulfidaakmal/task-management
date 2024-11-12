import { useState } from "react";

export const useGetAllTasks = () => {
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const request = async (query) => {
    setIsPending(true);

    const url = import.meta.env.VITE_API_URL;

    const { success, data, message, paging } = await fetch(
      query ? `${url}?${query?.toString()}` : url,
      {
        credentials: "include",
      }
    ).then((res) => res.json());

    if (success) {
      setData(data);
      setPaging(paging);
    } else {
      setIsError(true);
      setErrorMessage(message || "something went wrong");
    }

    setIsPending(false);
  };

  return { request, data, paging, isError, isPending, errorMessage };
};
