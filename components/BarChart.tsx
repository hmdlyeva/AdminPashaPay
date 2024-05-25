"use client";
import React from "react";
import {
  Bar,
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
type Props = {};

const data = [
  {
    name: "Jan",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Feb",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Mar",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Apr",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "May",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jun",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jul",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Aug",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Sep",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Oct",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Nov",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Dec",
    income: Math.floor(Math.random() * 50) + 10,
    expense: Math.floor(Math.random() * 50) + 10,
  },
];

export default function BarChart({}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey={"income"} fill="#00DBC8" radius={[4, 4, 0, 0]} />
        <Bar dataKey={"expense"} fill="#FF7B5F" radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
