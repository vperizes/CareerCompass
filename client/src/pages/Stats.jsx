import axios from "axios";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const statsQuery = (params) => {
  const { sortStats } = params;
  return {
    queryKey: ["stats", sortStats ?? "all"],
    queryFn: async () => {
      const { data } = await axios.get("/api/v1/jobs/stats", {
        params: params,
      });
      return data; //getting axios data from return query data (this replaces the need for data.data in useQuery)
    },
  };
};

//can only use hooks in component or custom hooks -> need to pass queryClient (App.jsx) directly to loader -> achieve this by making statsLoader a function that returns a function
export const statsLoader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    await queryClient.ensureQueryData(statsQuery(params)); //ensureQueryData -> async function that gets an existing query's cached data.
    return { sortStatsValue: { ...params } };
  };

const Stats = () => {
  const { sortStatsValue } = useLoaderData();
  const { data } = useQuery(statsQuery(sortStatsValue)); //if cached data existed, useQuery will get it. if not, then ensureQueryData will refetch on autofocus.
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
