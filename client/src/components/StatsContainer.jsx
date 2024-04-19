import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaRegTimesCircle,
  FaGem,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import { STATS_SORT_BY } from "../../../utils/constants";
import { Form, useSubmit } from "react-router-dom";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcgColor: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcgColor: "#e0e8f9",
    },
    {
      title: "declined applications",
      count: defaultStats?.declined || 0,
      icon: <FaRegTimesCircle />,
      color: "#d66a6a",
      bcgColor: "#ffeeee",
    },
    {
      title: "offers",
      count: defaultStats?.offer || 0,
      icon: <FaGem />,
      color: "#2e6827",
      bcgColor: "#d4f5d9",
    },
  ];

  const increment = [...Object.values(STATS_SORT_BY)];
  const submit = useSubmit();

  return (
    <Wrapper>
      <Form>
        <div className="stats-links">
          <input
            className="stat-link"
            type="button"
            value="all"
            name="sortStats"
            onClick={(event) => {
              submit(event.currentTarget.form);
            }}
          />
          {increment.map((item) => {
            return (
              <button
                key={item}
                name="sortStats"
                className="stat-link"
                type="submit"
                value={item}
              >
                {item == "1" ? "last month" : item + " months"}
              </button>
            );
          })}
        </div>
      </Form>

      <div className="stat-card">
        {stats.map((item) => {
          return <StatItem key={item.title} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};
export default StatsContainer;
