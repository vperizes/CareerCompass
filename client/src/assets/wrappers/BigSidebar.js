import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    .menu-container {
      height: 60px;
      width: 100%;
      align-items: center;
    }
    .nav-links {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem;
      font-size: 1.25rem;
      text-transform: capitalize;
      transition: font-size 0.3s ease-in-out;
      border-bottom: 2px solid var(--grey-600);
      border-radius: var(--border-radius);
      letter-spacing: 1px;
    }
    .nav-link:hover {
      color: var(--primary-700);
      box-shadow: 0 0.5em 0.5em -0.4em var(--primary-200);
      transform: translateY(-0.25em);
      font-size: 1.5rem;
      transition: var(--transition);
      letter-spacing: 5px;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: var(--primary-700);
      box-shadow: 0 0.6em 0.6em -0.4em var(--primary-600);
      font-size: 1.5rem;
    }
    .pending {
      background: var(--background-color);
    }
  }
`;
export default Wrapper;
