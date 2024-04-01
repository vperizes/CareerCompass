import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: flex;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .menu-container {
      background: var(--background-sidebar);
      height: 60px;
      width: 100vw;
      align-items: center;
    }
    .nav-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 50px;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem;
      font-size: 1rem;
      text-transform: capitalize;
      transition: font-size 0.3s ease-in-out;
    }
    .nav-link:hover {
      font-size: 1.2rem;
      color: var(--primary-700);
      transition: var(--transition);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: var(--primary-700);
      font-size: 1.2rem;
    }
    .pending {
      background: var(--background-color);
    }
  }
`;
export default Wrapper;
