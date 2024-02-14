import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaPencilAlt,
  FaAngleDoubleDown,
} from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [hasNote, setHasNote] = useState(false);
  const handleNote = () => {
    if (applicationNote) {
      setHasNote(!hasNote);
    }
  };

  let date = applicationDate.toString().split("T")[0];
  date = dayjs(date).format("MMM D, YYYY");
  const isClicked = selected === _id;

  //useState, isExpanded. create condition for setting isExpanded to true

  return (
    <Wrapper className={hasNote && "expanded"}>
      <motion.header layout="position">
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
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
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </motion.div>
        <div className={applicationNote && "accordian"}>
          <JobInfo
            icon={<FaPencilAlt />}
            text={applicationNote}
            isNote
            clickedNote={isClicked}
          />
          {applicationNote && (
            <button
              onClick={() => {
                handleNote();
                handleSelectJob(_id);
              }}
              className={
                isClicked ? "btn accordian-btn expand" : "btn accordian-btn"
              }
            >
              <FaAngleDoubleDown />
            </button>
          )}
        </div>

        <motion.footer layout="position" className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`/dashboard/delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </motion.footer>
      </motion.div>
    </Wrapper>
  );
};
export default Job;
