import { dateFormat } from "../utils/dateFormat";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";

const TaskForm = ({ formik }) => {
  return (
    <div className="grid gap-2">
      <Input
        placeholder={"New Task"}
        name={"title"}
        formik={formik}
        max={100}
      />
      <TextArea
        name={"description"}
        formik={formik}
        placeholder={"Describe the task..."}
      />
      <Input
        defaultValue={dateFormat(new Date())}
        name={"date"}
        type="date"
        formik={formik}
      />
      <Select name={"is_important"} formik={formik} />
    </div>
  );
};

export default TaskForm;
