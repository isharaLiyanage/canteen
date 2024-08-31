import ConformOrder from "@/components/admin/orders/ConformOrder";
import Statues from "@/components/order/Statues";
import { getServerSideProps } from "@/utils/API_Req/Get_Order";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface Product {
  name: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: Product; // Include the Product type for the product object
}

interface Order {
  id: string;
  userId: string;
  address: string;
  price:number;
  map: string;
  status: string;
  payment: true;
  orderItems: OrderItem[];
}
const OrderTracking = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const res = await getServerSideProps(id);

  const data: Order = res.orders.orders;

  console.log(data);
  return (
    <div className="container p-4 mx-auto">
      <div className="bg-glass p-6 rounded-lg shadow-md">
        <Statues data={data} />
        <h2 className="sm:text-2xl mb-4 text-xl font-semibold">All Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="sm:text-base py-2 text-xs">Order Code</th>
                <th className="sm:text-base py-2 text-xs">Product Name</th>
                <th className="sm:text-base py-2 text-xs">Qty</th>
                <th className="sm:text-base py-2 text-xs">Price</th>
                <th className="sm:text-base py-2 text-xs">Delivery Status</th>
                <th className="sm:text-base py-2 text-xs">Payment</th>
                <th className="sm:text-base py-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-b">
                <td className="sm:text-base py-2 text-xs">{data.id}</td>
                <td className="sm:text-base py-2 text-xs">
                  {data.orderItems.map((e) => (
                    <div key={e.id}>{e.product.name}</div>
                  ))}
                </td>
                <td className="sm:text-base py-2 text-xs">
                  {data.orderItems.map((e) => (
                    <div key={e.id}>{e.quantity}</div>
                  ))}
                </td>
                <td className="sm:text-base py-2 text-xs">${data.price}</td>
                <td className="py-2">
                  <span className="sm:text-sm px-3 py-1 text-xs text-yellow-800 bg-yellow-300 rounded-full">
                    {data.status}
                  </span>
                </td>
                <td className="sm:text-base py-2 text-xs">
                  {data.payment ? "Done" : "Cache On Delivery"}
                </td>
                <td className="py-2">
                  <ConformOrder status={data.status} id={data.id} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
