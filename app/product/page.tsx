"use client";
import { addItem } from "@/utils/redux/slice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [value, setValue] = useState<number>(1);
  const handleMinus = () => {
    if (value == 1) {
      setValue(1);
    } else {
      setValue(value - 1);
    }
  };
  const dispatch = useDispatch();
  //  const handleClick = () => {
  //    const cartItems = { product: data, quantity: 4 };
  //    dispatch(addItem(cartItems));
  //  };
  return (
    <div>
      <div className="flex  items-center h-screen my-auto justify-between">
        <div className="  w-6/12 relative">
          <Image src={""} fill objectFit="cover" alt="" />
        </div>
        <div className=" w-5/12">
          <div className=" font-bold text-xl my-3">title</div>
          <p className=" italic mb-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
            sunt minus nihil!
          </p>
          <p className=" font-bold text-blue-400 my-3">tag</p>

          <p>
            price : <span className=" font-bold"> $10</span>{" "}
          </p>
          <div className=" my-2">
            <button onClick={handleMinus}>-</button>
            <input type="number" className=" w-8 text-center " value={value} />
            <button onClick={() => setValue(value + 1)}>+</button>
          </div>

          <button className="bg-blue-600 text-white hover:bg-blue-800 font-bold px-4 py-2 rounded focus:outline-none ">
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}
