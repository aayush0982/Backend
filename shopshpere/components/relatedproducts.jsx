"use client"
import { ShopContext } from '@/context/shopcontext'
import React, { useContext, useEffect, useState } from 'react'
import ProductItems from './productitems';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [filteredproducts, setfilteredproducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempproduct = products.slice();
      tempproduct = tempproduct.filter((i) => category === i.category);
      tempproduct = tempproduct.filter((i) => subCategory === i.subCategory);
      console.log("Filtered Products:", tempproduct);
      setfilteredproducts(tempproduct.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='flex gap-4 mt-4'>
      {filteredproducts.map((items, index) => (
        <div key={index}>
          <ProductItems key={index} id={items._id} name={items.name} price={items.price} image={items.image} />
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
