"use client"
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/shopcontext'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
    const { products, cartItems, currency } = useContext(ShopContext);
    const [orderedItems, setorderedItems] = useState([]);

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

        setorderedItems(tempdata)

    }, [cartItems])
    return (
        <div className='mt-24 px-24'>
            <div className='text-3xl'>
                <Title text1={"Ordered"} text2={"Products"} />
            </div>
            <div>
                {
                    orderedItems.map((item, index) => {
                        const orderItems = products.filter((products) => products._id === item._id)[0];
                        return (
                            <div key={index} className='flex gap-32 items-center'>

                                <div className="flex gap-4 mt-8">
                                    <img className='rounded-sm' src={orderItems.image[0]} width={80} alt="product img" />
                                    <div >
                                        <p>{orderItems.name}</p>
                                        <div className='flex gap-2'>
                                            <div className="flex gap-1">
                                                <p>{currency}</p>
                                                <p>{orderItems.price}</p>
                                            </div>
                                            <p className='px-1 text-sm flex items-center bg-gray-300 w-fit rounded-md'>{item.size}</p>
                                        </div>
                                        <div className='flex gap-2 items-end mt-4'>
                                            <p className='font-semibold'>Date:</p>
                                            <p className='text-sm text-gray-600'>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p>🟢 Shipping in Progress</p>
                                </div>
                                <div>
                                    <Button variant="outline">Track Order</Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Page
