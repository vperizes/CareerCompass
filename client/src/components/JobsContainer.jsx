import { useState } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import { motion } from "framer-motion";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  const [selected, setSelected] = useState(null);

  const handleSelectJob = (id) => {
    if (selected === id) {
      return setSelected(null);
    }
    setSelected(id);
  };

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <motion.h5 layout>
        {totalJobs} {jobs.length > 1 ? "jobs" : "job"} found
      </motion.h5>
      <motion.div layout="position" className="jobs">
        {jobs.map((job) => {
          return (
            <Job
              key={job._id}
              {...job}
              handleSelectJob={handleSelectJob}
              selected={selected}
            />
          );
        })}
      </motion.div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
