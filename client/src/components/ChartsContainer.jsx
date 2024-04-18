import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChart from "./AreaChart";

const ChartsContainer = ({ data }) => {
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <AreaChart data={data} />
    </Wrapper>
  );
};
export default ChartsContainer;
