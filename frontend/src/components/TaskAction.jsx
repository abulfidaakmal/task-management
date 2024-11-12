import { Check, Ellipsis, Pencil, Trash, X } from "lucide-react";
import { dialog } from "../utils/handleDialog";
import { useUpdateStatusTask } from "../hooks/useUpdateStatus";

const TaskAction = ({ task, setIdTask, setTask }) => {
  const { isPending, request } = useUpdateStatusTask();

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    request(task.id, { is_completed: !task.is_completed });
  };

  const handleUpdateTask = () => {
    setIdTask(task.id);
    setTask(task);
    dialog("Modal_Update").open();
  };

  return (
    <div className="dropdown dropdown-top dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 h-max min-h-max px-1">
        <Ellipsis />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content dropdown-top menu bg-base-100 rounded-box z-[1] p-2 shadow w-44"
      >
        <li onClick={handleUpdateStatus}>
          {isPending ? (
            <span className="loading loading-spinner" />
          ) : (
            <a className="flex justify-between">
              <span>{task.is_completed ? "Not completed" : "Completed "}</span>
              {task.is_completed ? <X /> : <Check />}
            </a>
          )}
        </li>
        <li onClick={handleUpdateTask}>
          <a className="flex justify-between">
            <span>Edit</span>
            <Pencil />
          </a>
        </li>
        <li
          onClick={() => {
            setIdTask(task.id);
            dialog("Modal_Remove").open();
          }}
        >
          <a className="flex justify-between">
            <span>Delete</span>
            <Trash />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TaskAction;
