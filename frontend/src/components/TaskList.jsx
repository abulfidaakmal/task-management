import { dateFormat } from "../utils/dateFormat";
import Pagination from "./Pagination";
import RemoveAlert from "./RemoveAlert";
import { useRemoveTask } from "../hooks/useRemoveTask";
import { useState } from "react";
import TaskAction from "./TaskAction";
import UpdateTask from "./UpdateTask";

const TaskList = ({ tasks, paging }) => {
  const [idTask, setIdTask] = useState();
  const [task, setTask] = useState();

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 justify-center">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-base-100 w-[250px] h-56 rounded-md p-3 grid content-between"
          >
            <div className="grid">
              <span className="font-extrabold mb-1 line-clamp-1">
                {task.title}
              </span>
              <span className="line-clamp-6">
                {task.description || "No description"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>{dateFormat(task.date)}</span>
              <TaskAction task={task} setIdTask={setIdTask} setTask={setTask} />
            </div>
          </div>
        ))}
      </div>
      <UpdateTask idTask={idTask} task={task} />
      <RemoveAlert idTask={idTask} onRemove={useRemoveTask} />
      {paging?.total_page > 1 && <Pagination paging={paging} />}
    </div>
  );
};

export default TaskList;
