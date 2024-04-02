import styled from "styled-components";

const Wrapper = styled.button`
  background: transparent;
  .icon,
  .toggle-icon {
    font-size: 1.5rem;
    display: grid;
    place-items: center;
    color: var(--text-secondary-color);
  }
  .icon {
    margin-right: 1rem;
  }
  .toggle-icon {
    margin-left: 1rem;
  }
`;
export default Wrapper;
