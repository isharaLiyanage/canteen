import { addNotification, NotificationType } from "@/utils/redux/notifiySlice";
import { addItem } from "@/utils/redux/slice";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card as CardC, CardContent } from "../ui/card";
import { useDispatch } from "react-redux";
import Link from "next/link";
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
export default function Card({ data }: { data: product }) {
  const [value, setValue] = useState<number>(1);

  const handleMinus = () => {
    if (value == 1) {
      setValue(1);
    } else {
      setValue(value - 1);
    }
  };
  const handlePluse = () => {
    setValue(value + 1);
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    const cartItems = { product: data, quantity: value };
    dispatch(addItem(cartItems));
    dispatch(
      addNotification({
        id: uuidv4(),
        type: "Message",
        message: "Success! Your item is now in the cart",
      })
    );
  };
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data.price ? data.price : 0);
  return (
    <div className="snap-start bg-glass max-w-64 min-w-56 shadow-slate-200 my-2 rounded-md shadow-md">
      <div className=" rounded-t-md relative w-full h-40 m-auto bg-white">
        <Carousel className="h-40 w-full [&>button]:hover:opacity-50">
          <CarouselContent>
            {data.image.map((_: any, index: any) => (
              <CarouselItem key={index}>
                <div className="">
                  <CardC>
                    <CardContent className="aspect-square relative  h-40  w-full">
                      <Image
                        fill
                        alt=""
                        className=" rounded-t-md m-auto"
                        objectFit="cover"
                        src={_}
                      />
                    </CardContent>
                  </CardC>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" opacity-0" />
          <CarouselNext className=" opacity-0" />
        </Carousel>
      </div>
      <div className=" px-3">
        <strong>{data.name}</strong> <br />
        <Link href={""} className="">
          {data.category}
        </Link>

        <p className="line-clamp-5 h-[100px] text-sm">{data.desc}</p>
        <div className="flex justify-between w-full">
          <div className="">
            <div className=""> {formatted}</div>
          </div>
          <div className=" my-2">
            <button onClick={handleMinus}>-</button>
            <input type="number" className=" w-8 text-center" value={value} />
            <button onClick={handlePluse}>+</button>
          </div>
        </div>
        <button
          className=" px-3 py-1 m-auto mb-2 bg-blue-500 border border-blue-600 rounded shadow"
          onClick={handleClick}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
