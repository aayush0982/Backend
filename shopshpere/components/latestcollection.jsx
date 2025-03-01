"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/shopcontext'
import Title from './title';
import ProductItems from './productitems';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestproducts, setlatestproducts] = useState([]);

    useEffect(() => {
      setlatestproducts(products.slice(0,10));
    }, [])
    
    // console.log(latestproducts)
  return (
    <div className='my-24'>

      <div className='text-5xl'>
      <Title text1={"Latest"} text2={"Collections"}/>
      </div>

      {/* latest collecions */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8'>
        {
          latestproducts.map((items,index)=>(
            <ProductItems key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection;
