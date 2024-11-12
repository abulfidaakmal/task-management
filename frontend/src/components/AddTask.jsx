import { useFormik } from "formik";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import { dateFormat } from "../utils/dateFormat";
import { useCreateTask } from "../hooks/useCreateTask";
import { create } from "../utils/tasks-schema";

const AddTask = () => {
  const { isError, isPending, request } = useCreateTask();

  const formik = useFormik({
    initialValues: {
      title: undefined,
      description: undefined,
      date: dateFormat(new Date()),
      is_important: false,
    },
    validationSchema: create,
    onSubmit: (values) => {
      request(values);
    },
  });

  return (
    <Dialog
      formik={formik}
      isError={isError}
      isPending={isPending}
      operation={"Add"}
    >
      <TaskForm formik={formik} />
    </Dialog>
  );
};

export default AddTask;
