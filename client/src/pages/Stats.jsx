import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

export const statsLoader = async () => {
  return null;
  const response = await axios.get("/api/v1/jobs/stats");
  return response.data;
};

const Stats = () => {
  //const { defaultStats, monthlyApplications } = useLoaderData();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => axios.get("/api/v1/jobs/stats"),
  });

  if (isLoading) return <h4>Loading...</h4>;
  if (isLoading) return <h4>Error...</h4>;

  const { defaultStats, monthlyApplications } = data.data;

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
