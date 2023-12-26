import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import axios from "axios";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

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
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcgColor="#fcefc7"
        icon={<FaSuitcaseRolling />}
      ></StatItem>
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcgColor="#e0e8f9"
        icon={<FaCalendarCheck />}
      ></StatItem>
    </Wrapper>
  );
};
export default Admin;
