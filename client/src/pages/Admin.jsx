import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import axios from "axios";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";

export const adminLoader = async ({ request }) => {
  try {
    const { data } = await axios.get("/api/v1/users/admin");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { user, jobs } = useLoaderData();
  return (
    <Wrapper>
      <h1>Admin page</h1>
    </Wrapper>
  );
};
export default Admin;
