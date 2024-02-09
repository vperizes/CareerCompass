import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { motion } from "framer-motion";

dayjs.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobStatus,
  jobType,
  jobLocation,
  applicationDate,
  applicationNote,
  selected,
  handleSelectJob,
}) => {
  let date = applicationDate.toString().split("T")[0];
  date = dayjs(date).format("MMM D, YYYY");
  const clickedNote = selected === _id;

  return (
    <Wrapper className={clickedNote && "expanded"}>
      <motion.header layout>
        <motion.div className="main-icon">{company.charAt(0)}</motion.div>
        <motion.div className="info">
          <motion.h5>{position}</motion.h5>
          <motion.p>{company}</motion.p>
        </motion.div>
      </motion.header>
      <motion.div
        layout
        transition={{ layout: { duration: 0.75, type: "spring" } }}
        className="content"
      >
        <motion.div layout="position" className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <motion.div className={`status ${jobStatus}`}>{jobStatus}</motion.div>
        </motion.div>
        <motion.div
          layout="position"
          className="accordian"
          onClick={() => {
            handleSelectJob(_id);
          }}
        >
          <JobInfo
            icon={<FaPencilAlt />}
            text={applicationNote}
            isNote
            clickedNote={clickedNote}
          />
          <span className="btn">{clickedNote ? "-" : "+"}</span>
        </motion.div>

        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`/dashboard/delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </motion.div>
    </Wrapper>
  );
};
export default Job;
