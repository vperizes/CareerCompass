import styled from "styled-components";

const Wrapper = styled.div`
  button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }

  .stats-links {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .stat-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 0.5rem;
    font-size: 16px;
    text-transform: capitalize;
    background-color: transparent;
    letter-spacing: var(--letter-spacing);
    border-radius: var(--border-radius);
    transition: color 0.3s, box-shadow 0.3s, transform 0.3s, letter-spacing 0.3s;
  }

  .stat-link:hover {
    color: var(--primary-700);
    box-shadow: 0 0.5em 0.5em -0.4em var(--primary-200);
    transform: translateY(-0.25em);
    letter-spacing: 5px;
  }

  .active {
    color: var(--primary-700);
  }
`;
export default Wrapper;
