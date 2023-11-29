import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      {/* outlet needed for children/nested components to render when navigated too */}
      <Outlet />
    </>
  );
};
export default HomeLayout;
