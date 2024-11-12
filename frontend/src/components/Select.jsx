const Select = ({ formik, name }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="capitalize mb-1">
        Important
      </label>
      <select
        className="w-full select select-bordered"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name={name}
        id={name}
        aria-label={name}
        defaultValue={formik.values?.[name] ? "true" : "false"}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <span className="text-error">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default Select;
