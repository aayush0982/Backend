"use client"
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/shopcontext'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
    const { products, currency, cartItems, updateQuantity, cartTotalAmount, setcartitemCount } = useContext(ShopContext)
    const [cartData, setcartData] = useState([])

    const handleCheckout = async () => {
    try {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartData }), // Sending cart items to the backend
        });

        if (!res.ok) {
            throw new Error("Failed to update cart data");
        }
        setcartitemCount(0);

        console.log("Cart data updated successfully!");
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};

      
    useEffect(() => {
        let tempdata = []
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempdata.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }

        // console.log(tempdata)
        setcartData(tempdata)

    }, [cartItems])

    return (
        <div className='mt-20 px-24 flex flex-col'>

            <div className='text-3xl mb-16'>
                <Title text1={"Your"} text2={"Cart"} />
            </div>

            <div>
                {cartData.map((item, index) => {
                    const productData = products.filter((product) => product._id === item._id)[0];
                    if (!productData) {
                        return null;
                    }
                    return (
                        <div className="grid grid-cols-2 mt-4" key={index}>

                            <div className="flex gap-4">
                                <img className='rounded-sm' src={productData.image[0]} width={80} alt="product img" />
                                <div >
                                    <p>{productData.name}</p>
                                    <div>
                                        <div className="flex gap-1">
                                            <p>{currency}</p>
                                            <p>{productData.price}</p>
                                        </div>
                                    </div>
                                    <p className='px-2 py-1 mt-4 bg-gray-300 w-fit rounded-md'>{item.size}</p>
                                </div>
                            </div>
                            <div className='flex gap-8 items-center h-fit justify-end'>
                                <div className='flex gap-2'>
                                    <p onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)} className='px-2 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md text-center'>−</p>
                                    <p className='rounded-md border border-gray-600 w-12 px-4 text-center py-1'>{item.quantity}</p>
                                    <p onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)} className='px-2 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md text-center'>＋</p>
                                </div>
                                <img onClick={() => updateQuantity(item._id, item.size, 0)} src="/assets/bin_icon.png" alt="delete icon" className='w-4 h-5 cursor-pointer' />
                            </div>

                        </div>
                    );
                })}
            </div>

            <div>
                <p className='text-lg font-medium mt-8 text-right'>Total Amount: {currency}{cartTotalAmount}</p>
            </div>
            <div className='flex justify-end mt-4'>
                <Link href={"/checkout"}>
                    <Button onClick={()=>handleCheckout()} className="rounded-md font-medium">Proceed to Checkout</Button>
                </Link>
            </div>

        </div>
    )
}

export default Page
