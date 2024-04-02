import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/ProfileContainer";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import ThemeToggle from "./ThemeToggle";

const ProfileContainer = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  const { role } = user;

  return (
    <Wrapper>
      <button
        type="button"
        className="btn profile-btn"
        onClick={() => setShowProfile(!showProfile)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showProfile ? "dropdown show-dropdown" : "dropdown"}>
        <NavLink to="profile" key="profile" className="dropdown-link">
          <span className="icon">
            <ImProfile />
          </span>
          Profile
        </NavLink>
        {role === "admin" && (
          <NavLink to="admin" key="admin" className="dropdown-link">
            <span className="icon">
              <MdAdminPanelSettings />
            </span>
            Admin
          </NavLink>
        )}
        <ThemeToggle />
        <NavLink key="logout" onClick={logoutUser} className="dropdown-link">
          <span className="icon">
            <RiLogoutBoxRLine />
          </span>
          Logout
        </NavLink>
      </div>
    </Wrapper>
  );
};
export default ProfileContainer;
