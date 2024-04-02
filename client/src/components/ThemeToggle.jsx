import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";
import { BsFillMoonFill } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme} className="dropdown-link">
      <span className="icon">
        <BsFillMoonFill />
      </span>
      Dark Mode
      <span className="toggle-icon">
        {isDarkTheme ? <BsToggleOn /> : <BsToggleOff />}
      </span>
    </Wrapper>
  );
};
export default ThemeToggle;
