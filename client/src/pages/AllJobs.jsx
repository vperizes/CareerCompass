import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";

export const allJobsLoader = async ({ request }) => {
  try {
    const { data } = await axios.get("/api/v1/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();
const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
