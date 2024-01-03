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
        <Tooltip contentStyle={{ backgroundColor: "#1e293b" }} cursor={false} />
        <Bar dataKey="count" stroke="#2cb1bc" fill="#b3f8fd" barSize={100} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
