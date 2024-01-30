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
}) => {
  let date = applicationDate.toString().split("T")[0];
  date = dayjs(date).format("MMM D, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <JobInfo
          icon={<FaPencilAlt />}
          text={applicationNote}
          className="note"
        />
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
      </div>
    </Wrapper>
  );
};
export default Job;
