import { Ellipsis } from "lucide-react";
import { dateFormat } from "../utils/dateFormat";

const TaskSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Array.from({ length: 6 }).map((task) => (
        <div
          key={task}
          className="bg-base-100 w-[250px] h-56 rounded-md p-4 grid content-between"
        >
          <div className="grid">
            <span className="skeleton w-48 h-5 mb-2" />
            <div className="grid gap-1">
              {Array.from({ length: 4 }).map((result) => (
                <span className="skeleton w-full h-4" key={result} />
              ))}
              <span className="skeleton w-56 h-4" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>{dateFormat(new Date())}</span>
            <div tabIndex={0} className="btn m-1 h-max min-h-max px-1">
              <Ellipsis />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;
