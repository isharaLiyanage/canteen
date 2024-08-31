"use client"
import EditProduct from '@/components/admin/EditProduct/EditProduct'
import { fetcher } from '@/utils/fetcher';
import React from 'react'
import useSWR from 'swr';
type Product ={id: string,
    name: string,
    desc: string,
    image: string[],
    category:string,
    price:number,
    star: null |number,
    tag:[]}
export default function Page({ params }: { params: { id: string } }) {

    const { data, error, isLoading } = useSWR("/api/admin/products/"+params.id, fetcher);
 const product = data?.product
console.log(data?.product)
if(isLoading)  return (
  <div className=""> Loading ...</div>
)
  return (
    <div>
        <EditProduct product={product}/>
    </div>
  )
}
