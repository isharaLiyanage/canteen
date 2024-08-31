import Image from "next/image";
import React from "react";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Data = {
  data: {
    id: string;
    manu: string;
    image: string;
  }[];
  massage: string;
  status: number;
};
export default function Menu() {
  const { data, error } = useSWR<Data>("/api/product/menu", fetcher);

  return (
    <div key={"products"} className=" flex flex-wrap">
      {data
        ? data.data?.map((e: any, key: number) => (
            <div className=" relative ml-2 text-center w-28" key={key}>
              <Image
                src={e.image}
                width={100}
                height={100}
                objectFit="cover"
                sizes="60"
                alt={e.manu}
              />
              {e.manu}
            </div>
          ))
        : "Nothing..."}
    </div>
  );
}
