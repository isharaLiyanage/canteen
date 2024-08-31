"use client";
import { fetcher } from "@/utils/fetcher";
import { INITIAL_STATE, productReducer } from "@/utils/Reducer/productReducer";
import Image from "next/image";
import React, { useReducer } from "react";
import useSWR from "swr";
import Products from "./ProductList";
import { Skeleton } from "../ui/skeleton";

type Data = {
  data: [
    {
      id: string;
      manu: string;
      image: string;
    }
  ];
};

export default function ProductBar() {
  // get data form api

  const { data, error, isLoading } = useSWR<Data>("/api/product/menu", fetcher);

  const menu = data?.data;

  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
  if (error) {
    dispatch({ type: "FETCH_ErrorMassage", payload: error });
  }
  // if (isLoading) {
  //   dispatch({ type: "FETCH_START" });
  // }

  // update product reducer  as a menu
  const handelClick = (e: any) => {
    dispatch({ type: "FETCH_PRODUCT_TYPE", payload: e });
  };
  if(isLoading) 
    return  (
      <div className=" bg-glass px-1 py-1 mx-2 my-3">
 <h3 className=" text-xl font-bold">Explore Menu</h3>
      <p className=" font-mono">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio ex
        et neque.
      </p> 
    <div className="flex items-center space-x-4   w-11/12 m-auto mt-2">
       
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-16 h-16 rounded-full" />

      </div>
     
    </div>
  )
  return (
    <section className=" bg-glass px-1 py-1 mx-2 my-3">
      <h3 className=" text-xl font-bold">Explore Menu</h3>
      <p className=" font-mono">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio ex
        et neque.
      </p>
      <div className=" relative w-11/12 m-auto mt-2">
        <div className=" scroll-smooth scroll-w-0 flex items-center gap-5 overflow-x-scroll">
          {menu?.length &&
            menu.map((e: any, key: number) => (
              <div
                key={key}
                className=" text-center cursor-pointer"
                onClick={() => handelClick(e.manu)}
              >
                <div className=" bg-fuchsia-500 relative w-16 h-16 overflow-hidden rounded-full">
                  <Image
                    src={e.image}
                    alt={e.manu}
                    fill
                    quality={60}
                    objectFit="cover"
                  />
                </div>
                {e.manu}
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-around items-center bg-[#ffffff4b] p-4 rounded-md">
        <span className="text-lg font-semibold">
          {state.product_type && state.product_type.length > 0
            ? state.product_type
            : "All"}
        </span>
        <button
          className="hover:text-blue-800 focus:outline-none ml-4 font-bold text-blue-600"
          onClick={(e) => {
            dispatch({ type: "FETCH_PRODUCT_TYPE", payload: ["All"] });
          }}
        >
          Reset
        </button>
      </div>

      <Products type={state.product_type} />
    </section>
  );
}
