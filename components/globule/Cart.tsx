"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/utils/redux/store";
import { removeItem } from "@/utils/redux/slice";
import Link from "next/link";

export default function Cart(props: any) {
  const handleClick = () => {
    props.data(false);
  };
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleCancel = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className=" z-50 px-4 py-4 bg-white border rounded shadow">
      <div className=" float-right mb-2" onClick={handleClick}>
        x
      </div>
      <div className=" my-2">
        <h6>
          <strong>Cart</strong>
        </h6>
        {cartItems ? (
          <div className="">
            {cartItems.map((item) => (
              <div className="" key={item.product.id}>
                <div
                  key={item.product.id}
                  className=" flex justify-between w-full"
                >
                  <div className=" flex items-center gap-1">
                    <div className="">
                      <Image
                        src={item.product.image[0]}
                        width={100}
                        height={80}
                        alt=""
                      />
                    </div>
                    <div className="">
                      Name : {item.product.name} <br />
                      Quantity : {item.quantity} <br />
                      <span className=" font-bold">
                        Price : ${item.product.price}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className=" hover:text-blue-700 hover:font-bold ml-2 mr-1 text-blue-500"
                      onClick={() => handleCancel(item.product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* <button type="button" className=" bg-indigo-500" disabled>
                <svg
                  className="animate-spin w-5 h-5 mr-3"
                  viewBox="0 0 24 24"
                ></svg>
                Processing...
              </button> */}
              </div>
            ))}
            {cartItems.length > 0 ? (
              <Link
                href={"/checking"}
                onClick={handleClick}
                className=" hover:bg-blue-800 focus:outline-none float-right px-4 py-2 font-bold text-white bg-blue-600 rounded cursor-pointer"
              >
                Order Now
              </Link>
            ) : (
              <div>No items here</div>
            )}
          </div>
        ) : (
          <div>No items here</div>
        )}
      </div>
    </div>
  );
}
