import Image from "next/image";
import React from "react";

export default function SecondSection() {
  return (
    <section className=" bg-glass px-1 rounded flex justify-between w-11/12 m-auto ">
      <div className=" w-6/12 py-4 m-auto">
        <div className="">
          <h1 className=" font-bold text-xl">
            Discover the Convenience of Our Food Delivery Service
          </h1>
          <p>
            Order your favorite meals from the comfort of your home and let us
            take care of the delivery. Enjoy delicious food without the hassle.
          </p>
        </div>
        <div className="flex justify-between w-9/12 m-auto py-3">
          <div className="">
            <h3 className="  font-bold text-lg"> Fast Delivery </h3>
            <p>
              We strive to deliver your food promptly, ensuring it arrives fresh
              and hot
            </p>
          </div>
          <div className="">
            <h3 className="  font-bold text-lg">Easy Ordering </h3>
            <p>
              Browse our menu, select your dishes, and place your order in just
              a few clicks.
            </p>
          </div>
        </div>
      </div>
      <div className=" w-6/12 relative h-72">
        {" "}
        <Image
          alt=";"
          fill
          src={"/img/de.jpg"}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </section>
  );
}
