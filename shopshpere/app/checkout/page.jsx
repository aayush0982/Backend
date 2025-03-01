"use client"
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/shopcontext'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
    const { currency, cartTotalAmount } = useContext(ShopContext)
    const [amount, setamount] = useState(0)

    useEffect(() => {
        let tempamount = 50 + cartTotalAmount
        setamount(tempamount)
    }, [cartTotalAmount])

    return (
        <div className='mt-20 px-24 flex items-center gap-32 py-20 justify-center'>
            {/* left part */}
            <div>
                <div className='flex gap-4'>
                    <input className='px-4 py-1 outline-none border border-gray-300 rounded-md' type="text" placeholder='Enter first name' />
                    <input className='px-4 py-1 outline-none border border-gray-300 rounded-md' type="text" placeholder='Enter last name' />
                </div>
                <input className='mt-4 px-4 py-1 outline-none border border-gray-300 rounded-md w-full' type="mail" placeholder='Enter email address' />
                <div>
                    <input className='mt-4 px-4 py-1 outline-none border border-gray-300 rounded-md w-full' type="type" placeholder='Enter your address' />
                    <div className='flex gap-4 mt-4'>
                        <input className='px-4 py-1 outline-none border border-gray-300 rounded-md' type="text" placeholder='Enter your state' />
                        <input className='px-4 py-1 outline-none border border-gray-300 rounded-md' type="text" placeholder='Enter your city' />
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <input className='px-4 py-1 outline-none border border-gray-300 rounded-md' type="text" placeholder='Enter your state' />
                        <input className='px-4 py-1 outline-none border border-gray-300 rounded-md' type="text" placeholder='Enter your zipcode' />
                    </div>
                    <input className='mt-4 px-4 py-1 outline-none border border-gray-300 rounded-md w-full' type="type" placeholder='Enter your phone number' />
                </div>
            </div>

            {/* right part */}
            <div>
                <div className='flex gap-1'>
                    <p className='text-gray-500 text-lg font-semibold'>Cart</p>
                    <p className='text-lg font-semibold'>Amount</p>
                    <p className='h-[2px] w-32 mt-4 bg-gray-700'></p>
                </div>
                <div>
                    <p className='font-medium mt-2 '>Total Amount: {currency}{cartTotalAmount}</p>
                    <p className='font-medium mt-2 mb-2 '>Delivery Fee: {currency}50</p>
                    <hr />
                    <p className='font-medium mt-2 mb-2 '>Delivery Fee: {currency}{amount}</p>
                </div>
                <Link href={"/order"}>
                    <Button className="rounded-md font-medium mt-12">Place Order</Button>
                </Link>
            </div>
        </div>
    )
}

export default Page
