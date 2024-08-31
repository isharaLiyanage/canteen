import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className=" bg-glass md:flex-row sm:w-11/12 z-10 flex flex-col justify-between w-full gap-2 py-16 m-auto">
      <div className=" md:w-7/12 px-3 my-auto">
        <div className="">
          <h1 className=" select-none sm:text-5xl text-2xl font-bold">
            Delicious Food Delivered Right to Your Doorstep
          </h1>
          <p className=" mt-2 select-none">
            Delicious Food Delivered Right to Your Doorstep{" "}
          </p>
        </div>
        <div className=" flex gap-4 mt-3">
          <div className=" px-3 py-1 text-white bg-black">
            <Link href={""}>Order Now</Link>
          </div>
          <div className="px-3 py-1 border border-black">
            <Link href={""}>Learn More</Link>
          </div>
        </div>
      </div>

      <div className=" md:w-6/12 flex flex-wrap gap-4 m-auto">
        
          <div className=" sm:h-96 sm:w-36 relative -rotate-6  rounded-3xl overflow-hidden w-20 h-16 mt-2 bg-gray-400">
            <Image
              src={"/img/1.jpg"}
              fill
              objectFit="cover"
              alt="hero section image"
            />
          </div>
         
        
        
         
          <div className=" sm:h-96 sm:w-40 relative w-20  -rotate-6  rounded-3xl overflow-hidden h-16 mt-2 bg-gray-400">
            <Image
              src={"/img/6we.jpg"}
              fill
              objectFit="cover"
              sizes="50"
              alt="hero section image"
            />
          </div>
          <div className=" sm:h-96 sm:w-36 -rotate-6  rounded-3xl overflow-hidden relative w-20 h-16 mt-2 bg-gray-400">
            <Image
              src={"/img/6ww.jpg"}
              fill
              objectFit="cover"
              
              alt="hero section image"
            />
          </div>
      
      </div>
    </section>
  );
}
