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
    right: -10px;
    text-align: center;
    visibility: hidden;
    gap: 15px;
    min-width: 200px;
    background: var(--background-sidebar);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-link {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    color: var(--text-secondary-color);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    width: 100%;
    border-radius: var(--border-radius);
  }
  .dropdown-link:hover {
    background-color: var(--profilecontainer-hover);
  }

  .icon,
  .toggle-icon {
    display: grid;
    place-items: center;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  .toggle-icon {
    font-size: 2rem;
    margin-left: 1.5rem;
    color: var(--primary-300);
  }
`;

export default Wrapper;
