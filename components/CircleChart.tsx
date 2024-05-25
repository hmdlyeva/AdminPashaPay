"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

export type CircleProps = {
  name: string;
  value: number;
  color: string;
};

const CircleChart: React.FC<CircleProps> = (props) => {
  const { name, value, color } = props;
  const chartData = [
    { name, value },
    { name: "remainder", value: 100 - value, fill: "#f0f0f0" },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={65}
          startAngle={90}
          endAngle={450}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? color : "#f0f0f0"}
            />
          ))}
          <Label
            value={name}
            position="insideEnd"
            fill="#000"
            fontSize={13}
            offset={6}
          />
          <Label
            value={`${value}%`}
            position="center"
            fill="#000"
            fontSize={18}
            fontWeight="bold"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default CircleChart;
