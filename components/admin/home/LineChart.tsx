"use client";
import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const LineCharts = ({ data }: { data: any }) => {
  return (
    <div className=" w-20 h-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default LineCharts;
