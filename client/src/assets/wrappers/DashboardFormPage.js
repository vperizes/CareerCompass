import styled from "styled-components";

const Wrapper = styled.section`
  ${"" /* border: 0.3rem solid var(--background-color); */}
  border: 0.1rem solid var(--grey-500);
  box-shadow: var(--shadow-4);
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  ${"" /* profile image update styling */}
  .imgupdate-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
  }
  p {
    margin-top: 10px;
  }
  .avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: solid 2px var(--primary-400);
  }
  .label-pos {
    top: -10px;
    left: 10px;
  }
  .img-update {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: solid 2px var(--primary-400);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
