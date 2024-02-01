const Note = ({ name, labelText, defaultValue }) => {
  return (
    <div className="note">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        className="form-input note-input"
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder="Add a note..."
      />
    </div>
  );
};
export default Note;
