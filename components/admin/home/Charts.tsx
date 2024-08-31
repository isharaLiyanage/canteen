import React from "react";
import LineCharts from "./LineChart";
import { FaDollarSign, FaShoppingBag } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import { IoMdCloudDone } from "react-icons/io";
type SalesSummary = {
  current: {
    sales: number;
    orders: number;
    delivered: number;
  };
  lastWeek: {
    sales: number;
    orders: number;
    delivered: number;
  };
  beforeLastWeek: {
    sales: number;
    orders: number;
    delivered: number;
  };
};
type Details = {
  deliveredOrders: number;
  newOrders: number;
  newUsers: number;
  totalSales: number | null;
  salesSummary: SalesSummary;
};
export default function Charts({ data }: { data: Details }) {
  console.log(data);
  const salesData = data.salesSummary;
  const SalesChartData = [
    {
      name: "Before Last Week",
      uv: salesData.beforeLastWeek.sales,
      pv: salesData.beforeLastWeek.sales,
      amt: salesData.beforeLastWeek.sales,
    },
    {
      name: "Last Week",
      uv: salesData.lastWeek.sales,
      pv: salesData.lastWeek.sales,
      amt: salesData.lastWeek.sales,
    },
    {
      name: "Current Week",
      uv: salesData.current.sales,
      pv: salesData.current.sales,
      amt: salesData.current.sales,
    },
  ];
  const orderChartData = [
    {
      name: "Before Last Week",
      uv: salesData.beforeLastWeek.orders,
      pv: salesData.beforeLastWeek.orders,
      amt: salesData.beforeLastWeek.orders,
    },
    {
      name: "Last Week",
      uv: salesData.lastWeek.orders,
      pv: salesData.lastWeek.orders,
      amt: salesData.lastWeek.orders,
    },
    {
      name: "Current Week",
      uv: salesData.current.orders,
      pv: salesData.current.orders,
      amt: salesData.current.orders,
    },
  ];

  const deliveredChartData = [
    {
      name: "Before Last Week",
      uv: salesData.beforeLastWeek.delivered,
      pv: salesData.beforeLastWeek.delivered,
      amt: salesData.beforeLastWeek.delivered,
    },
    {
      name: "Last Week",
      uv: salesData.lastWeek.delivered,
      pv: salesData.lastWeek.delivered,
      amt: salesData.lastWeek.delivered,
    },
    {
      name: "Current Week",
      uv: salesData.current.delivered,
      pv: salesData.current.delivered,
      amt: salesData.current.delivered,
    },
  ];

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data.totalSales ? data.totalSales : 0);
  return (
    <div className=" flex flex-wrap justify-around flex-1 m-auto my-3">
      <div className=" max-w-[11rem] bg-white px-2 py-4  flex">
        <div className="">
          <FaDollarSign size={15} />
          Total Sales <br />
          <strong>{formatted}</strong>
        </div>
        <LineCharts data={SalesChartData} />
      </div>
      <div className=" max-w-[11rem] bg-white px-2 py-4 flex ">
        <div className="">
          <IoFootsteps size={15} />
          New Users <br />
          <strong>{data.newUsers}</strong>
        </div>
        <LineCharts data={data} />
      </div>
      <div className="flex max-w-[11rem] bg-white px-2 py-4  ">
        <div className="">
          <FaShoppingBag size={15} />
          New Orders <br />
          <strong>{data.newOrders}</strong>
        </div>
        <LineCharts data={orderChartData} />
      </div>
      <div className="flex max-w-[11rem] bg-white px-2 py-4 ">
        <div className="">
          <IoMdCloudDone size={15} />
          Delivered Orders <br />
          <strong>{data.deliveredOrders}</strong>
        </div>
        <LineCharts data={deliveredChartData} />
      </div>
    </div>
  );
}
