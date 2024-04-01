import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  z-index: 2;
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-700);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .toggle-btn:hover {
    color: var(--primary-800);
  }

  .logo-text {
    display: none;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }

  ${"" /* for big screen */}
  @media (min-width: 990px) {
    top: 0;
    .toggle-btn {
      display: none;
    }

    .nav-center {
      width: 90%;
    }

    .logo-text {
      display: flex;
    }
  }
`;
export default Wrapper;
