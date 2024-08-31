"use client";

import PaypalButton from "@/components/checking/PayPal";
import { removeAll } from "@/utils/redux/slice";
import { RootState } from "@/utils/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Page() {
  const [address, setAdders] = useState<string>();
  const [map, setMap] = useState<string>();
  const [payment, setPayment] = useState();

  const [upload, setUpload] = useState({
    loading: false,
    error: null,
    done: false,
  });
  const route = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const total: number = cartItems.reduce((acc: number, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const handleChildData = async (data: any) => {
    // const response = await fetch(
    //   `https://api.sandbox.paypal.com/v2/checkout/orders/${data.orderID}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.PAYPAL_ID}`,
    //     },
    //   }
    // );

    // const res = await response.json();
    
    setPayment(data);
    toast("Payment Success ");
  };
 

  const handelClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUpload({ ...upload, loading: true });

    try {
      setUpload({ ...upload, loading: true });
      const product = cartItems.map((item) => {
        return { productId: item.product.id, quantity: item.quantity };
      });
      const details = { address, map, product, total, payment };

      const data = await fetch("/api/order", {
        method: "post",
        body: JSON.stringify(details),
      });

      const res = await data.json();

      if (res.status === 400) {
   
        setUpload({
          ...upload,
          done: false,
          loading: false,
          error: res.message,
        });
      }
      if (res.status === 500) {
        setUpload({
          ...upload,
          done: false,
          loading: false,
          error: res.message,
        });
      } else {
        toast("Order Conformed ");
        dispatch(removeAll());
        setUpload({ ...upload, loading: false, done: true });
        route.push("/order/" + res.id);
      }
    } catch (err: any) {

      setUpload({ ...upload, done: false, loading: false, error: err.message });
    }
  };

  return (
    <div className="item-center md:flex-row flex flex-col h-screen gap-4 px-3">
      <div className=" md:w-6/12 flex items-center justify-center m-auto">
        <div className=" bg-glass shadow-white w-full px-3 py-3 mx-2 rounded shadow-sm">
          <h3> Delivery Details </h3>
          Cost : $58 <br />
          <div className=" flex flex-col">
            <input
              type="text"
              className="focus:outline-none focus:border-blue-500 px-4 py-1 border border-gray-300 rounded-lg"
              placeholder="Please add a adders need to deliver"
              onChange={(e) => setAdders(e.target.value)}
            />{" "}
            <br />
            <input
              type="text"
              className="focus:outline-none focus:border-blue-500 px-4 py-1 border border-gray-300 rounded-lg"
              placeholder="Please add a map location(optional)"
              onChange={(e) => setMap(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="shadow-sm w-full m-auto  shadow-white md:w-6/12 my-auto bg-glass p-5 max-w-[25rem] flex  flex-col gap-2">
        {cartItems ? (
          <div className="">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="md:flex-row border-b-blue-100 flex flex-col items-center justify-between gap-3 p-1 border border-l-0"
              >
                <div className=" relative flex gap-1">
                  <Image
                    src={item.product.image[0]}
                    width={64}
                    height={64}
                    objectFit="cover"
                    alt=""
                  />
                  <div className="">
                    <strong> {item.product.name}</strong> <br />
                    Quantity :{item.quantity}
                  </div>
                </div>
                <div className=" w-16">
                  price
                  <br />
                  <span className=" font-bold">${item.product.price}</span>
                </div>
              </div>
            ))}
            <div className="border-t-neutral-600 border-x-0 flex justify-between py-5 my-2 border border-b-0">
              <strong>Total :</strong>${total}
            </div>
            <div className="">
              {payment ? (
                "click Done"
              ) : (
                <PaypalButton setPay={handleChildData} total={total} />
              )}
            </div>
            <p className=" m-auto text-center">Or</p>
            <button
              onClick={(e) => handelClick(e)}
              className={`w-full px-5 py-1 mx-auto font-bold text-black rounded-sm transition-all duration-300
                ${
                  upload.loading
                    ? "bg-yellow-200 animate-pulse"
                    : "bg-yellow-400 hover:bg-yellow-500"
                }
                ${upload.done ? "bg-green-400  hover:bg-green-500" : ""}
                ${upload.error ? "bg-red-400 hover:bg-red-500" : ""}
              `}
            >
              {upload.loading
                ? "Checking..."
                : upload.error
                ? "Something Wrong"
                : upload.done
                ? "DONE"
                : payment
                ? "Conform"
                : "Cash On Delivery"}
            </button>

            {upload.error && (
              <p className="mt-2 text-red-500">{upload.error}</p>
            )}
          </div>
        ) : (
          <div className=" mt-12">No Items here</div>
        )}
      </div>
    </div>
  );
}
export default Page;
