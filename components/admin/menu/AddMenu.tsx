"use client";
import Image from "next/image";

import React, { useState } from "react";
import Menu from "./Menu";

export default function AddMenu() {
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<File>();
  const [load, setLoad] = useState(false);
  const [errors, setError] = useState<string>();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;
    if (selectedImages) {
      setFile(selectedImages[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoad(true);
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      try {
        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/de0uvxaje/image/upload",
          { body: data, method: "post" }
        );

        if (uploadRes.ok) {
          const responseData = await uploadRes.json();
          const newProduct = {
            inputValue,
            image: responseData,
          };

          const upload = await fetch("/api/product/menu", {
            method: "post",
            body: JSON.stringify(newProduct),
          });
          console.log(upload);
          if (upload.ok) {
            setFile(undefined);
            setInputValue("");
            setLoad(false);
          }
        } else {
          throw new Error("Image upload failed");
          setLoad(false);
        }
      } catch (err) {
        console.log(err);
        setError("Something Wrong");
        setLoad(false);
      }
    } else {
      setError("Please Add image");
      setLoad(false);
    }
  };
  return (
    <div>
      <Menu key={load ? "refresh" : "initial"} />
      <form>
        <div className="flex flex-col w-64 gap-5 ml-4">
          <input
            type="text"
            placeholder={"Name"}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-l-lg"
          />

          <label className="hover:bg-gray-100 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer">
            <span className="text-gray-700">Choose Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </label>
          {file && (
            <p className="relative w-32 h-32 ml-4 text-gray-700">
              <Image
                src={window.URL.createObjectURL(file)}
                alt={File.name}
                fill
                objectFit="cover"
              />
              {/* Selected: {selectedFile.name} */}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className={`${
              load
                ? " text-blue bg-blue-900 hover:bg-blue-900 animate-bounce "
                : " text-white bg-blue-500"
            }  mt-2 ml-2 px-4 py-2  text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none`}
          >
            {load ? "" : "Submit"}
          </button>
          {errors && (
            <div className=" px-2 text-red-500 bg-white rounded">{errors}</div>
          )}
        </div>
      </form>
    </div>
  );
}
