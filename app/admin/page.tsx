import Charts from "@/components/admin/home/Charts";
import LineCharts from "@/components/admin/home/LineChart";
import { Users } from "@/components/admin/home/NewUsers";
import AddMenu from "@/components/admin/menu/AddMenu";
import { Get_Admin_Dashboard } from "@/utils/API_Req/Get_Admin_Dashboard";
import React from "react";
type UsersDetails = {
  id: string;
  email: string | null;
  total: number;
};
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
  usersDetails: UsersDetails[];
  deliveredOrders: number;
  newOrders: number;
  newUsers: number;
  totalSales: number | null;
  salesSummary: SalesSummary;
};
async function page() {
  const data = await Get_Admin_Dashboard();
  console.log(data);
  const details: Details = data.res.details;
  const { usersDetails, ...others } = details;
  return (
    <div>
      <Charts data={others} />
      <Users users={usersDetails} />
    </div>
  );
}

export default page;
