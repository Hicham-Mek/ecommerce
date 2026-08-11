import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["var(--color-primary-600)", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#64748b"];

const StatusChart = ({ data }) => (
  <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-6 flex flex-col h-full">
    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">Orders By Status</h2>

    <div className="flex-1 w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} className="stroke-[var(--bg-surface)] stroke-2 outline-none" />
            ))}
          </Pie>

          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StatusChart;
