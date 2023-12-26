import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ title, count, icon, color, bcgColor }) => {
  return (
    <Wrapper color={color} bcgColor={bcgColor}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
