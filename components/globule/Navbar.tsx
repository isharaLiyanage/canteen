"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Auth from "../auth/Auth";
import Cart from "./Cart";
import Notification from "./Notification";
import { AiFillMail } from "react-icons/ai";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { RootState, useAppSelector } from "@/utils/redux/store";
import { useSession } from "next-auth/react";
import { Profile } from "./Profile";

export default function Navbar() {
  const [popUp, setPopUp] = useState(false);
  const [popUpCart, setPopUpCart] = useState(false);
  const [popUpNotification, setPopUpNotification] = useState(false);
  const { data: session, status } = useSession();
  const cartItems = useAppSelector(
    (state: RootState) => state.notifications.notifications
  );

  const isNotification = cartItems.find((e) => e.read == false);

  const getDataNotification = (data: any) => {
    setPopUpNotification(data);
  };
  const getDataCart = (data: any) => {
    setPopUpCart(data);
  };
  const getData = (data: any) => {
    setPopUp(data);
  };
  return (
    <nav className=" bg-glass relative z-50 flex flex-wrap items-center justify-between flex-shrink-0 w-11/12 px-1 py-2 m-auto mb-1">
      <Link href={"/"} className="">
        Logo
      </Link>
      <div className=" sm:flex hidden gap-2">
        <Link href={""}>Products</Link>
        <Link href={""}>Orders</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About Us</Link>
      </div>
      <div className=" flex items-center">
        <button
          onClick={() => {
            setPopUpCart(!popUpCart);
            setPopUpNotification(false);
            setPopUp(false);
          }}
          className=" px-3"
        >
          <FaShoppingCart size={18} />
        </button>
        <button
          onClick={() => {
            setPopUpNotification(!popUpNotification);
            setPopUp(false);
            setPopUpCart(false);
          }}
          className=" relative px-3"
        >
          {isNotification && (
            <div className=" -top-1 absolute flex w-3 h-3 ml-2">
              <span className="animate-ping bg-sky-400 absolute inline-flex w-full h-full rounded-full opacity-75"></span>
              <span className="bg-sky-500 relative inline-flex w-3 h-3 rounded-full"></span>
            </div>
          )}
          <FaBell size={18} />
        </button>
        {session?.user ? (
          <div>
            <Profile
              image={session.user.image}
              id={session.user.name}
              name={session.user.name}
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setPopUp(!popUp);
              setPopUpNotification(false);
              setPopUpCart(false);
            }}
            className=" border-fuchsia-400 px-3 border"
          >
            Sign In
          </button>
        )}
      </div>
      {/* Notification Section  */}
      <div
        className={`${
          popUpNotification ? " block" : " hidden"
        } z-50  fixed inset-0  w-full h-screen   top-8 right-4 `}
      >
        <div
          className=" absolute inset-0 z-40 w-full h-screen"
          onClick={() => setPopUpNotification(false)}
        ></div>
        <Notification data={getDataNotification} />
      </div>
      {/* Cart Section  */}
      <div
        className={`${
          popUpCart ? " block" : " hidden"
        } z-50  fixed inset-0  w-full h-screen flex justify-center items-center  top-8 right-4 `}
      >
        <div
          className=" absolute inset-0 z-50 w-full h-screen"
          onClick={() => setPopUpCart(false)}
        ></div>
        <Cart data={getDataCart} />
      </div>

      {/* Sign in section  */}
      <div
        className={`${
          popUp ? " block" : " hidden"
        } z-50  fixed inset-0  w-full h-screen flex justify-center items-center bg-[#00000034] top-8 right-4 `}
      >
        <>
          <div
            className="bg-gray-50 absolute inset-0 z-50 w-full h-screen opacity-75"
            onClick={() => setPopUp(false)}
          />{" "}
          {/* Added transparency and click handler */}
          <Auth data={getData} />
        </>
      </div>
      <div className=" sm:hidden flex justify-center  border-t  m-auto max-w-[640px] w-full gap-2">
        <Link href={""}>Products</Link>
        <Link href={"/user/" + session?.user?.name}>Orders</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About Us</Link>
      </div>
    </nav>
  );
}
