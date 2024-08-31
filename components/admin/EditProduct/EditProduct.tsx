"use client";
import AddMenu from "@/components/admin/menu/AddMenu";
import { fetcher } from "@/utils/fetcher";
import { addNotification } from "@/utils/redux/notifiySlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
type Data = {
  data: [
    {
      id: string;
      manu: string;
      image: string;
    }
  ];
};
type Product ={id: string,
    name: string,
    desc: string,
    image: string[],
    category:string,
    price:number,
    star: null |number,
    tag:[]}
export default function EditProduct({product}:{product:Product}) {
  const [images, setImages] = useState<File[]>([]);
//set product Images to state

  const [upload, setUpload] = useState({
    loading: false,
    done: false,
    error: false,
    err: "",
  });

  const [formData, setData] = useState({
    name:  "",
    desc:  "",
    category:  "",
    tag: "",
    price: 0,
    image:[""]
  });
  useEffect(()=>{
    setData({
      name: product.name  || "",
      desc: product.desc  || "",
      category: product.category  || "",
      tag: product.tag.join(', ') || "",
      price:product.price || 0,
      image:product.image
    })
  },[])
  const dispatch = useDispatch();
  // fetch menu titles
  const { data, error, isLoading } = useSWR<Data>("/api/product/menu", fetcher);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;

    if (selectedImages) {
      // Convert FileList to an array and limit to 3 images
      const imagesArray = Array.from(selectedImages).slice(0, 3);

      // Check if adding these images would exceed the maximum allowed (3 images)
      if (images.length + imagesArray.length > 3) {
        // Calculate how many images need to be removed to maintain the limit
        const excessCount = images.length + imagesArray.length - 3;

        // Remove the oldest images from the start of the array
        setImages((prevImages) => prevImages.slice(excessCount));
      }

      // Set the new images array including the previously stored images
      setImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };
  //  handle darg image
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const selectedImages = e.dataTransfer.files;

    if (selectedImages) {
      // Convert FileList to an array and limit to 3 images
      const imagesArray = Array.from(selectedImages).slice(0, 3);

      // Check if adding these images would exceed the maximum allowed (3 images)
      if (images.length + imagesArray.length > 3) {
        // Calculate how many images need to be removed to maintain the limit
        const excessCount = images.length + imagesArray.length - 3;

        // Remove the oldest images from the start of the array
        setImages((prevImages) => prevImages.slice(excessCount));
      }

      // Set the new images array including the previously stored images
      setImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUpload({ loading: true, error: false, done: false, err: "" });
  
    // const uploadImage = images.map(async (image, key) => {
    //   console.log(key);
    //   const data = new FormData();
    //   data.append("file", image);
    //   data.append("upload_preset", "upload");
    //   try {
    //     const uploadRes = await fetch(
    //       "https://api.cloudinary.com/v1_1/de0uvxaje/image/upload",
    //       { body: data, method: "post" }
    //     );

    //     if (uploadRes.ok) {
    //       const responseData = await uploadRes.json();
    //       return responseData.url;
    //     } else {
    //       setUpload((prevState) => ({
    //         ...prevState,
    //         loading: false,
    //         err: "Network Error",

    //         error: true,
    //         done: false,
    //       }));
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
    // const uploadedUrls = await Promise.all(uploadImage);
    // const urls = uploadedUrls.filter((url) => url);
    // console.log(urls);
   
      const newProduct = {
        formData,
        
      }

      const post = await fetch(`/api/admin/products/${product.id}`, {
        method: "post",
        body: JSON.stringify(newProduct),
      });
   
      if (post.ok) {
        setUpload((prevState) => ({
          done: true,
          loading: false,
          error: false,
          err: "",
        }));
        dispatch(
          addNotification({
            id: uuidv4(),
            type: "Success",
            message: "Success! Product Uploaded Successfully",
          })
        );
      } else {
        setUpload((prevState) => ({
          loading: false,
          error: true,
          done: false,
          err: "can not upload",
        }));
      }
    
  };

  return (
    <div className=" bg-glass h-screen">

      <div className=" my-auto mt-4 ml-3">
        <strong className=" my-2 text-white underline"> Edit Products</strong>

        <div className=" md:flex-row flex-warp flex flex-col justify-around">
          {/* flex */}
          <div className="flex flex-col bg-[#ffffffc4]  p-4 rounded border border-white">
            <div className="">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                required
              
                name="name"
                defaultValue={product.name}
                onChange={(e) => {
                  setData({ ...formData, name: e.target.value });
                }}
                className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              defaultValue={product.desc}
              required
              className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-lg"
              id=""
              onChange={(e) => {
                setData({ ...formData, desc: e.target.value  });
              }}
            />
            <label htmlFor="tag">Tag</label>
            <p className=" text-sm">use coma (,) to separate tags</p>
            <textarea
              name="tag"
              required
              defaultValue={product.tag.join(', ')}
              className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-lg"
              id=""
              onChange={(e) => {
                setData({ ...formData, tag: e.target.value });
              }}
            />
          </div>

          {/* flex */}
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col bg-[#ffffffc4]  p-4 rounded border border-white"
          >
            <label htmlFor="image">Image</label>
            <input
              type="file"
              required
              className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-lg"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className=" flex gap-2">
              {product.image.length !== 0 &&
                product.image.map((image, key) => (
                  <div key={key} className=" text-center">
                    <div className="relative w-32 h-32">
                      <Image
                        fill
                        quality={50}
                        objectFit="cover"
                        objectPosition="center"
                        src={image}
                        alt={image}
                      />
                    </div>
                    {key + 1}
                  </div>
                ))}
            </div>
            <select
              name="category"
              required
              defaultValue={product.category}
              className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-lg"
              id=""
              onChange={(e) => {
                setData({ ...formData, category: e.target.value });
              }}
            >
              {data &&
                data.data.map((e: any, key: number) => (
                  <option key={key} value={e.manu} selected={key === 0}>
                    {e.manu}
                  </option>
                ))}
            </select>
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              className="focus:outline-none focus:border-blue-500 px-4 py-2 border border-gray-300 rounded-lg"
              name="price"
              id=""
              defaultValue={product.price}
              required
              onChange={(e) => {
                setData({ ...formData, price: parseInt(e.target.value, 10) });
              }}
            />
            <button
              type="submit"
              onClick={handleCreate}
              className={`${
                upload.loading
                  ? " text-blue bg-blue-900 hover:bg-blue-900 animate-bounce "
                  : " text-white bg-blue-500"
              }  mt-2 ml-2 px-4 py-2  text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none`}
            >
              Upload{" "}
            </button>
            {upload.loading}
            {upload.done && (
              <div className=" text-blue-500">
                Product Uploaded Successfully
              </div>
            )}
            {upload.error && <div className=" text-red-500">{upload.err}</div>}
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
