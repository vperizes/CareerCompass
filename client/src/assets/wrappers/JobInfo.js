import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .job-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
  .note-text {
    width: 100%;
    height: 18px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
  }
  .show {
    display: flex;
    height: auto;
  }
`;
export default Wrapper;
