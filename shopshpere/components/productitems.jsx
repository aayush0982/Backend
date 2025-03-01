"use client"
import React, { useContext } from 'react'
import { ShopContext } from '@/context/shopcontext'
import Link from 'next/link'

const ProductItems = (props) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link href={`/product/${props.id}`}>
            <div className='overflow-hidden'>
                <img className='rounded-sm hover:scale-110 transition ease-in-out' src={props.image[0]} alt="product_img" />
            </div>
                <p className='mt-3 text-sm  font-medium'>{props.name}</p>
                <p className='text-sm text-gray-600'>{currency}{props.price}</p>
        </Link>
    )
}

export default ProductItems
