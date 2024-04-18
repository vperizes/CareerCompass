import styled from "styled-components";

const Wrapper = styled.section`
  .stats-buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .stat-card {
    margin-top: 2rem;
    display: grid;
    row-gap: 2rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 990px) {
    .stat-card {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .stat-card {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
export default Wrapper;
