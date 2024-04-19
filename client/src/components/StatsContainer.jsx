import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaRegTimesCircle,
  FaGem,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import { STATS_SORT_BY } from "../../../utils/constants";
import { Link } from "react-router-dom";

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

  return (
    <Wrapper>
      <div className="stats-links">
        <Link className="stat-link" to={{ search: "?sortStats=all" }}>
          all
        </Link>
        {increment.map((item) => {
          return (
            <Link className="stat-link" to={{ search: `?sortStats=${item}` }}>
              {item == "1" ? "last month" : item + " months"}
            </Link>
          );
        })}
      </div>

      <div className="stat-card">
        {stats.map((item) => {
          return <StatItem key={item.title} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};
export default StatsContainer;
