// components/Footer.js

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" w-full py-8 bg-[#ffffff7e] hover:bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="sm:w-1/2 lg:w-1/4 w-full mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              FoodExpress
            </h2>
            <ul className="text-gray-600">
              <li className="mb-2">
                <Link href="" className="flex items-center">
                  <span className="mr-2">📧</span>
                  info@foodexpress.com
                </Link>
              </li>
              <li className="mb-2">
                <Link href="" className="flex items-center">
                  <span className="mr-2">📞</span>
                  110 468 117 1058
                </Link>
              </li>
              <li className="mb-2">
                <span className="flex items-center">
                  <span className="mr-2">📍</span>
                  Avenue 6th floor, NYC
                </span>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2 lg:w-1/4 w-full mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Our Menu</h2>
            <ul className="text-gray-600">
              <li className="mb-2">
                <Link href="#">Breakfast</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Lunch</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Dinner</Link>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2 lg:w-1/4 w-full mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Information
            </h2>
            <ul className="text-gray-600">
              <li className="mb-2">
                <Link href="#">About Us</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Testimonials</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2 lg:w-1/4 w-full mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Useful Links
            </h2>
            <ul className="text-gray-600">
              <li className="mb-2">
                <Link href="#">Services</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Help & Support</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2 lg:w-1/4 w-full mb-2">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Social</h2>
            <ul className="flex space-x-4 text-gray-600">
              <li>
                <Link href="#">Facebook</Link>
              </li>
              <li>
                <Link href="#">Instagram</Link>
              </li>
              <li>
                <Link href="#">YouTube</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-4 mt-2 text-center border-t border-gray-300">
          <p className="text-gray-600">
            © Copyright 2022. Powered by Ishara Dulanjaya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
