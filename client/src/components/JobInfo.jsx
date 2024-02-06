import { useState } from "react";
import Wrapper from "../assets/wrappers/JobInfo";
const JobInfo = ({ icon, text, isNote }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      {isNote ? (
        <div
          className="accordian"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span
            className={
              expanded ? "job-text note-text show" : "job-text note-text"
            }
          >
            {text}
          </span>
          <span>{expanded ? "-" : "+"}</span>
        </div>
      ) : (
        <span className="job-text">{text}</span>
      )}
    </Wrapper>
  );
};
export default JobInfo;
