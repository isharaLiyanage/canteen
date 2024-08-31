import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <div className=" bg-glass w-2/12 h-screen">
      <div className=" bg-[#fff] pl-2">Admin Panel</div>
      <div className=" flex flex-col gap-2 mt-10 [&>a]:pl-2 ">
        <Link className=" hover:bg-[#ffffff3a]  " href={"/admin/dashboard"}>
          Dashboard
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/Orders"}>
          Orders
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/products"}>
          Products
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/addProduct"}>
         Add Product
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/customers"}>
          Customers
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/statistics"}>
          Statistics
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/review"}>
          Review
        </Link>
        <Link className=" hover:bg-[#ffffff3a]" href={"/admin/transaction"}>
          Transaction
        </Link>
      </div>
    </div>
  );
}
