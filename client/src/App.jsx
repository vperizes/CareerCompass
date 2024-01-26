import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  ForgotPassword,
  ResetPassword,
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
import { updateUserAction } from "./pages/Profile";
import { statsLoader } from "./pages/Stats";
import { forgotPasswordAction } from "./pages/ForgotPassword";
import ErrorElement from "./components/ErrorElement";
import { resetPasswordAction } from "./pages/ResetPassword";

//looks for 'darkTheme' value in local storage and depending on value we'll add dark theme and set value as state value
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

//invoking function here insures that default theme applies to all pages NOT just dashboard
checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //query will stay active for 5 min
    },
  },
});

//setting up router -> each route is an object, each page is a component
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
        action: loginAction(queryClient),
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction(queryClient),
      },
      {
        path: "/reset-password/:id/:token",
        element: <ResetPassword />,
        action: resetPasswordAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: createJobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: updateUserAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
