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
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
  }

  .note-text.show {
    display: flex;
    height: auto;
    max-height: 9999px;
    transition: all 0.5s cubic-bezier(1, 0, 1, 0);
  }

  .accordian {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    cursor: pointer;
  }
`;
export default Wrapper;
