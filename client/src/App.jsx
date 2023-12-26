import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages/index";

//action and loader imports
import { resgisterAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { dashboardLoader } from "./pages/DashboardLayout";
import { createJobAction } from "./pages/AddJob";
import { allJobsLoader } from "./pages/AllJobs";
import { editJobAction, editJobLoader } from "./pages/EditJob";
import { deleteJobAction } from "./pages/DeleteJob";
import { adminLoader } from "./pages/Admin";

//looks for 'darkTheme' value in local storage and depending on value we'll add dark theme and set value as state value
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

//invoking function here insures that default theme applies to all pages NOT just dashboard
checkDefaultTheme();

//setting up router
//each route is an object
//each page is a component
const router = createBrowserRouter([
  //make home route the parent for nested component
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      //index indicates the page that is rendered when ever we navigate to
      //the parent component
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: resgisterAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: createJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
