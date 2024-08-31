import { getServerSideProps } from '@/utils/API_Req/Get_Admin_Products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type Product ={id: string,
  name: string,
  desc: string,
  image: string[],
  category:string,
  price:number,
  star: null |number,
  tag:[]}
export default async function page() {
  const getProducts = await getServerSideProps()
  const data:Product[] =getProducts.res.products

  return (
    <div className=' my-5 overflow-x-auto'><table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="sm:text-base py-2 text-xs">Id</th>
        <th className="sm:text-base py-2 text-xs">Product Name</th>
        <th className="sm:text-base py-2 text-xs">Image</th>
        <th className="sm:text-base py-2 text-xs">Price ($)</th>
        <th className="sm:text-base py-2 text-xs">Category</th>
        <th className="sm:text-base py-2 text-xs">Star</th>
        <th className="sm:text-base py-2 text-xs">Tag</th>
      </tr>
    </thead>
    <tbody>
    {data.map((e) => (
          <tr key={e.id} className="text-center border-b">
          <td className="sm:text-base py-2 text-xs text-blue-400"><Link href={`/admin/addProduct/${e.id}`}>{e.id}</Link></td>
          <td className="sm:text-base py-2 text-xs">
           {e.name}
          </td>
          <td className="sm:text-base py-2 text-xs">
            <Image alt={e.name} width={66}  height={55} quality={45} src={e.image[0]}/>
          </td>
          <td className="sm:text-base py-2 text-xs">{e.price}</td>
          <td className="py-2">
            {e.category}
          </td>
          <td className="sm:text-base py-2 text-xs">
          {e.star}
          </td>
          <td className="py-2">
           {e.tag.map((e)=><span key={e}>{e+" "}</span>)}
          </td>
        </tr>
          ))}
     
    </tbody>
  </table></div>
  )
}
