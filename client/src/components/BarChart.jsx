import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#733cab", color: "#f8fafc" }} //specifically changes date text color and hover background
          itemStyle={{ color: "#f8fafc" }} //specifically changes color of count text
          cursor={false}
        />
        {/* stroke = --primary-600, fill = --grey-600 */}
        <Bar dataKey="count" stroke="#8653b7" fill="#646470" barSize={100} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
