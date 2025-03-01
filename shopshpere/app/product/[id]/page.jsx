"use client"
import { ShopContext } from '@/context/shopcontext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import RelatedProducts from '@/components/relatedproducts';


const ProductPage = () => {
  const params = useParams();
  const productId = params.id;

  const { products, currency, addtocart } = useContext(ShopContext)
  const [productData, setproductData] = useState(false);
  const [productImage, setproductImage] = useState([])
  const [size, setsize] = useState('')

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId || item.id === productId) {
        setproductData(item)
        setproductImage(item.image || [])
        console.log(item);
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])


  return (
    <div className='mt-20 px-24'>

      {/* product detail and images */}
      <div className='flex gap-24'>
        {/* product images carousel */}
        <div>
          <Carousel className="w-[30vw]">
            <CarouselContent>
              {productImage.map((item, index) => (
                <CarouselItem className="w-full" key={index}>
                  <img src={item} alt="product image" className='h-[60vh] w-[30vw] rounded-md object-cover' />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>

        {/* product detail */}
        <div className='mt-2'>
          <p className='text-2xl font-medium'>{productData.name}</p>
          <p>4.5 ★</p>
          <p className='font-bold text-3xl mt-2 mb-2'>{currency}{productData.price}</p>
          <p className='leading-6 w-[45vw] text-gray-600'>{productData.description}</p>
          <div className='mt-8'>
            <p className='font-medium mb-2'>Select Size</p>
            {(productData?.sizes || []).map((i, index) => (
              <Button onClick={() => setsize(i)} variant="outline" className={`mr-4 ${i === size ? 'border-orange-600' : ''}`} key={index}>{i}</Button>
            ))}
          </div>
          <Button className="mt-6 font-bold" onClick={()=>addtocart(productData._id,size)}>Add To Cart 🛒</Button>
          <hr className='mt-8 w-full' />
          <div className='flex flex-col text-gray-600 mt-5 text-sm leading-6'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>



      {/* decription and reviews */}
      <div className='mt-8'>
        <div className='flex gap-4'>
          <Button className="border-orange-600" variant="outline">Description</Button>
          <Button variant="outline">Reviews(122)</Button>
        </div>
        <div className='flex flex-col gap-3 px-2 py-4  mt-4 text-gray-600 rounded-md border-[.5px] border-gray-500'>
          <p>Welcome to Shopsphere, your ultimate online shopping destination! Discover a wide range of high-quality products, from trendy fashion and cutting-edge electronics to home essentials and unique gifts, all at unbeatable prices.</p>
          <p>With a user-friendly interface, secure payment options, and fast delivery, shopping has never been this convenient. Whether you’re looking for the latest gadgets, stylish clothing, or everyday must-haves, Shopsphere offers something for everyone. Enjoy exclusive discounts, hassle-free returns, and exceptional customer service, making your shopping experience smooth and enjoyable. Start exploring now and find exactly what you need, all in one place!</p>
        </div>
        <div>
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
      </div>

    </div>
  );
}

export default ProductPage;
