"use client";
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
} from "recharts";

const workerValueData = [
  {
    month: "Jan",
    employment: 40,
    resignation: 24,
    amt: 24,
  },
  {
    month: "Feb",
    employment: 55,
    resignation: 14,
    amt: 10,
  },
  {
    month: "Mar",
    employment: 44,
    resignation: 16,
    amt: 15,
  },
  {
    month: "Apr",
    employment: 59,
    resignation: 27,
    amt: 19,
  },
  {
    month: "May",
    employment: 38,
    resignation: 18,
    amt: 23,
  },
  {
    month: "Jun",
    employment: 62,
    resignation: 27,
    amt: 29,
  },
  {
    month: "Jul",
    employment: 43,
    resignation: 20,
    amt: 5,
  },
  {
    month: "Avg",
    employment: 35,
    resignation: 22,
    amt: 11,
  },
  {
    month: "Sep",
    employment: 51,
    resignation: 16,
    amt: 21,
  },
  {
    month: "Okt",
    employment: 50,
    resignation: 30,
    amt: 10,
  },
  {
    month: "Nov",
    employment: 20,
    resignation: 14,
    amt: 13,
  },
  {
    month: "Dec",
    employment: 30,
    resignation: 12,
    amt: 8,
  },
];

export default function WorkersValueChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={workerValueData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="employment"
          stroke="#00DBC8"
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="resignation"
          stroke="#FF8042"
          strokeDasharray="3 4 5 2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
