import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import ProfileContainer from "./ProfileContainer";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <Logo />
        <h4 className="logo-text">Dashboard</h4>
        <div className="btn-container">
          <ProfileContainer />
          <ThemeToggle />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
