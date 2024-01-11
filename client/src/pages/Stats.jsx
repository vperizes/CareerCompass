import axios from "axios";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await axios.get("/api/v1/jobs/stats");
    return response.data; //getting axios data from return query data (this replaces the need for data.data in useQuery)
  },
};

//can only use hooks in component or custom hooks -> need to pass queryClient (App.jsx) directly to loader -> achieve this by making statsLoader a function that returns a function
export const statsLoader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery); //ensureQueryData -> async function that gets an existing query's cached data.
  return data;
};

const Stats = () => {
  const { data } = useQuery(statsQuery); //if cached data existed, useQuery will get it. if not, then ensureQueryData will refetch on autofocus.
  const { defaultStats, monthlyApplications } = data;

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
