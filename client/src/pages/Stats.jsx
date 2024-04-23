import axios from "axios";
import {
  ChartsContainer,
  StatsContainer,
  FormInputSelect,
} from "../components";
import { useQuery } from "@tanstack/react-query";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { STATS_SORT_BY } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/Stats";

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
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(statsQuery(params)); //ensureQueryData -> async function that gets an existing query's cached data.
    return { sortStatsValue: { ...params } };
  };

const Stats = () => {
  const { sortStatsValue } = useLoaderData();
  const { sortStats } = sortStatsValue;
  console.log(sortStats);
  const { data } = useQuery(statsQuery(sortStatsValue)); //if cached data existed, useQuery will get it. if not, then ensureQueryData will refetch on autofocus.
  const { defaultStats, monthlyApplications } = data;

  const submit = useSubmit();

  return (
    <Wrapper>
      <Form>
        <div className="stats-links">
          <FormInputSelect
            name="sortStats"
            labelText="Stats duration"
            list={["all", ...Object.values(STATS_SORT_BY)]}
            defaultValue={sortStats}
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
        </div>
      </Form>

      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </Wrapper>
  );
};
export default Stats;
