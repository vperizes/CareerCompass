const FormInputSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((statusValue) => {
          return (
            <option key={statusValue} id={statusValue}>
              {statusValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormInputSelect;
