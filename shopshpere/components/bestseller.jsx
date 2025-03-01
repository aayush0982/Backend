"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/shopcontext'
import Title from './title';
import ProductItems from './productitems';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller, setbestseller] = useState([])

    useEffect(() => {
        const bestp = (products.filter((item)=>(item.bestseller)));
        setbestseller(bestp.slice(0,5));
    }, [])
    

  return (
    <div className='my-24'>
      
      <div className='text-5xl'>
      <Title text1={"Best"} text2={"Sellers"}/>
      </div>

      {/* best sellers */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8'>
        {
          bestseller.map((items,index)=>(
            <ProductItems key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
          ))
        }
      </div>


    </div>
  )
}

export default BestSeller
