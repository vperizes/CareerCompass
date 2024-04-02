import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  return (
    <Wrapper>
      <div className="menu-container">
        <NavLinks isBigSidebar />
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
