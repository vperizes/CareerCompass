const FormInput = ({ type, name, labelText, defaultValue, max = null }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        max={max}
        // onChange={onChange}
        required
      />
    </div>
  );
};
export default FormInput;
