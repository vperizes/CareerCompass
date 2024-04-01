import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard-page {
    display: grid;
    grid-template-columns: 1fr;
    width: 90vw;
    margin: 1rem auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default Wrapper;
