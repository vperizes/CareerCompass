import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#646470" stopOpacity={0.95} />
            <stop offset="95%" stopColor="#646470" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#733cab", color: "#f8fafc" }} //specifically changes date text color and hover background
          itemStyle={{ color: "#f8fafc" }} //specifically changes color of count text
          cursor={false}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#8653b7"
          strokeWidth="2px"
          fillOpacity={1}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
