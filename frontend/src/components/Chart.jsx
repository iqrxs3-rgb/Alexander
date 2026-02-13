// src/components/Chart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/**
 * Chart component ديناميكي
 * @param {Array} data - بيانات الرسم [{date: '2026-02-13', users: 100, servers: 50}]
 * @param {String} type - نوع الرسم ('line' أو 'bar')
 * @param {Array} keys - مفاتيح البيانات ['users', 'servers', 'commands']
 * @param {Array} colors - ألوان الخطوط أو الأعمدة ['#4f46e5','#f59e0b','#10b981']
 */

const Chart = ({ data, type = "line", keys = ["users", "servers"], colors = ["#4f46e5", "#f59e0b"] }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-full">
      <h2 className="text-xl font-bold mb-4">إحصائيات البوت</h2>
      <ResponsiveContainer width="100%" height={300}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((key, idx) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[idx % colors.length]} strokeWidth={2} />
            ))}
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((key, idx) => (
              <Bar key={key} dataKey={key} fill={colors[idx % colors.length]} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
