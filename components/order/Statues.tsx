import React from "react";
interface Order {
  id: string;
  userId: string;
  address: string;
  map: string;
  status: string;
  payment: true;
}
export default function Statues({ data }: { data: Order }) {
  console.log(data.status)
  return (
    <>
      <h2 className="sm:text-2xl mb-4 text-xl font-semibold">
        Track your Order
      </h2>
      <div className="mb-6">
        <p className="text-gray-700">Order Code: {data.id}</p>
        <div className="sm:flex-row sm:space-y-0 sm:space-x-4 flex flex-col items-center mt-4 space-y-2">
          <div className="flex-1">
            <div
              className={`${
                data.status === "ON_THE_WAY" || "PROCESS" || "ON_THE_WAY"
                  ? "bg-green-500"
                  : "bg-gray-300"
              } h-2  rounded-full`}
            ></div>
            <p className="mt-2 text-sm text-center">Process</p>
          </div>
          <div className="flex-1">
            <div
              className={`${
                  data.status === "DELIVERED" || data.status === "ON_THE_WAY"
                  ? "bg-green-500"
                  : "bg-gray-300"
              } h-2  rounded-full`}
            ></div>
            <p className="mt-2 text-sm text-center">ON THE WAY</p>
          </div>
          <div className="flex-1">
            <div
              className={`${
                data.status === "DELIVERED" ? "bg-green-500" : "bg-gray-300"
              } h-2  rounded-full`}
            ></div>
            <p className="mt-2 text-sm text-center">Delivered</p>
          </div>
        </div>

        <p className="mt-4 text-green-600">Your order has been delivered</p>
      </div>
    </>
  );
}
