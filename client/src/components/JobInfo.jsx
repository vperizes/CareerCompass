import Wrapper from "../assets/wrappers/JobInfo";
import { motion } from "framer-motion";
const JobInfo = ({ icon, text, isNote, clickedNote }) => {
  return (
    <Wrapper>
      <motion.span className="job-icon">{icon}</motion.span>
      {isNote ? (
        <motion.span
          className={
            clickedNote ? "job-text note-text show" : "job-text note-text"
          }
        >
          {text}
        </motion.span>
      ) : (
        <motion.span className="job-text">{text}</motion.span>
      )}
    </Wrapper>
  );
};
export default JobInfo;
