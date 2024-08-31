import { getServerSideProps } from "@/utils/API_Req/Get_Users_Details";
import Link from "next/link";
import React from "react";

type order = {};
type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
  };
};

type Order = {
  id: string;
  userId: string;
  price: number;
  payment: boolean;
  paymentMethod: string;
  paymentId: string | null;
  paymentSource: string | null;
  address: string | null;
  map: string | null;
  status: string;
  createAt: Date;
  seen: string | null;
  orderItems: OrderItem[];
};

async function Page({ params }: { params: { id: string } }) {
  const res = await getServerSideProps(params.id);
  const data = res.res.data.orders;

  if(data.length<1) return <div className=" flex w-full h-screen  text-white bg-[#24242467]  font-bold justify-center items-center"> Nothing Order Yet</div>
  return (
    <div>
      {" "}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="sm:text-base py-2 text-xs">Orders</th>
            <th className="sm:text-base py-2 text-xs">Products Name</th>
            <th className="sm:text-base py-2 text-xs">Qty</th>
            <th className="sm:text-base py-2 text-xs">Price</th>
            <th className="sm:text-base py-2 text-xs">Delivery Status</th>
            <th className="sm:text-base py-2 text-xs">Payment</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: Order) => (
              <tr key={item.id} className="text-center border-b">
                <td className="sm:text-base py-2 text-xs text-blue-500">
                  <Link href={"/order/" + item.id}> {item.id}</Link>
                </td>
                <td className="sm:text-base py-2 text-xs">
                  {item.orderItems.map((e) => (
                    <div
                      key={e.id}
                      className=" flex  justify-evenly  m-auto max-w-[40px] "
                    >
                      <p className=" text-ellipsis"> {e.product.name}</p>
                    </div>
                  ))}
                </td>
                <td className="sm:text-base py-2 text-xs">
                  {" "}
                  {item.orderItems.map((e) => (
                    <p key={e.id}>{e.quantity}</p>
                  ))}
                </td>
                <td className="sm:text-base py-2 text-xs">${item.price}</td>
                <td className="py-2">
                  <span className="sm:text-sm px-3 py-1 text-xs text-yellow-800 bg-yellow-300 rounded-full">
                    {item.status}
                  </span>
                </td>
                <td className="sm:text-base py-2 text-xs">
                  {item.payment ? "Done" : "Cache On Delivery"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Page;
