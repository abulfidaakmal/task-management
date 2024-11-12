import { useFormik } from "formik";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { update } from "../utils/tasks-schema";
import { useEffect } from "react";

const UpdateTask = ({ idTask, task }) => {
  const { isError, isPending, request } = useUpdateTask();

  const formik = useFormik({
    validationSchema: update,
    onSubmit: (values) => {
      request(idTask, values);
    },
  });

  useEffect(() => {
    formik.setValues({
      title: task?.title,
      description: task?.description,
      date: task?.date,
      is_important: task?.is_important,
    });
  }, [idTask, task]);

  return (
    <Dialog
      formik={formik}
      isError={isError}
      isPending={isPending}
      operation={"Update"}
    >
      <TaskForm formik={formik} />
    </Dialog>
  );
};

export default UpdateTask;
