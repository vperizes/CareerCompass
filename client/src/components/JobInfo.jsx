import Wrapper from "../assets/wrappers/JobInfo";
import { motion } from "framer-motion";
const JobInfo = ({ icon, text, isNote, clickedNote }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      {isNote ? (
        <span
          className={
            clickedNote ? "job-text note-text show" : "job-text note-text"
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
