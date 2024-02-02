import Wrapper from "../assets/wrappers/JobInfo";
import styled from "styled-components";

const JobInfo = ({ icon, text, isNote }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className={`job-text ${isNote && "note-text"}`}>{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
