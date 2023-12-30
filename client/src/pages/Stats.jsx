import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";

export const statsLoader = async () => {
  try {
    const response = await axios.get("/api/v1/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
