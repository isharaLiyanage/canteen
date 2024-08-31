"use client";
import React, { useReducer } from "react";
import Card from "../globule/Card";
import useSWR from "swr";
import { INITIAL_STATE, productReducer } from "@/utils/Reducer/productReducer";
import { Skeleton } from "../ui/skeleton";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
type product = {
  id: string;
  name: string;
  desc: string;
  image: string[];
  category: string;
  price: number;
  star: number | null;
  tag: string[];
};
export default function Products({ type }: any) {
  const { data, error, isLoading } = useSWR<any>(
    `/api/product/${type}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="scroll-w-0 snap-mandatory h-86 flex gap-6 py-1 mx-2 overflow-x-scroll">
      <div className="">
      <Skeleton className="h-40 max-w-64 min-w-56 " />
      <div className="space-y-2">
        <Skeleton className="h-16 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      </div>
        
      </div>
    );
  const products: [] | null = data?.product;
  return (
    <div className="scroll-w-0 snap-mandatory flex gap-6 py-1 mx-2 overflow-x-scroll">
      {products?.length !== 0 ? (
        products?.map((item: product) => <Card data={item} key={item.id} />)
      ) : (
        <div className=" py-36 m-auto text-lg text-center text-white">
          Seems like nothing in this Category
        </div>
      )}
    </div>
  );
}
