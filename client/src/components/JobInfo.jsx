import Wrapper from "../assets/wrappers/JobInfo";
const JobInfo = ({ icon, text, isNote, expanded }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      {isNote ? (
        <span
          className={
            expanded ? "job-text note-text show" : "job-text note-text"
          }
        >
          {text}
        </span>
      ) : (
        <span className="job-text">{text}</span>
      )}
    </Wrapper>
  );
};
export default JobInfo;
