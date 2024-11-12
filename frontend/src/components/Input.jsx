import { dateFormat } from "../utils/dateFormat";

const Input = ({
  type = "text",
  name,
  max,
  formik,
  className = "input input-bordered",
  placeholder,
}) => {
  const minDate = dateFormat(new Date());

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="capitalize mb-1">
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={className}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required={true}
        placeholder={placeholder}
        defaultValue={formik.values?.[name]?.slice(0, 10)}
        max={type !== "date" && max}
        min={type === "date" && minDate}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span className="text-error">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default Input;
