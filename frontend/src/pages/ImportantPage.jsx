import { useEffect } from "react";
import Layout from "../components/Layout";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useGetAllTasks } from "../hooks/useGetAllTasks";
import TaskSkeleton from "../components/TaskSkeleton";
import { useLocation } from "react-router-dom";

const ImportantPage = () => {
  const { isError, isPending, request, data, errorMessage, paging } =
    useGetAllTasks();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  query.append("is_important", true);

  useEffect(() => {
    request(query);
  }, [query.get("page")]);

  return (
    <Layout>
      {isError ? (
        <div className="grid justify-center w-full">
          <span>{errorMessage || "Internal Server Error"}</span>
        </div>
      ) : isPending ? (
        <TaskSkeleton />
      ) : (
        <TaskList tasks={data} paging={paging} />
      )}
      <AddTask />
    </Layout>
  );
};

export default ImportantPage;
