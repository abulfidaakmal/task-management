const TextArea = ({ name, formik, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="capitalize mb-1">
        {name}
      </label>
      <textarea
        className="textarea textarea-bordered"
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        required={false}
        defaultValue={formik.values?.[name]}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span className="text-error">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default TextArea;
