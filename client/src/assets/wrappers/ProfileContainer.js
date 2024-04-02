import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  .profile-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 45px;
    left: 0;
    height: 100%;
    text-align: center;
    visibility: hidden;
    gap: 20px;
    width: 200px;
    background: var(--background-sidebar);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-link {
    display: flex;
    padding: 0.5rem;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .dropdown-link:hover {
    background-color: var(--primary-800);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
`;

export default Wrapper;
