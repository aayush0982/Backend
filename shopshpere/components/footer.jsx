import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='mt-32 mb-8 px-24'>
            {/* links section */}
            <div className='flex gap-60 '>
                <div>
                    <div className='flex gap-1 items-center'>
                    <img src="/assets/logomain.png" alt="logo_icon" width={48} height={48} />
                    <p className='text-3xl font-semibold'>Shopsphere</p>
                    </div>
                    <p className='w-[30vw] leading-6 mt-2'>Your one-stop destination for all your shopping needs! Discover a wide range of products, unbeatable deals, and seamless shopping experiences—all in one place. Shop with confidence and convenience today!</p>
                </div>

                <div>
                    <h2 className='font-bold text-xl'>Quick Links</h2>
                    <ul>
                        <Link href={"/"}><li>Home</li></Link>
                        <li><Link href='/collections'>Collections</Link></li>
                        <Link href={"/order"}><li>My Orders</li></Link>
                        <Link href={"/about"}><li>About</li></Link>
                        <Link href={"/contact"}><li>Contact</li></Link>
                        <Link href={"/cart"}><li>Cart</li></Link>
                    </ul>
                </div>

                <div>
                <h2 className='font-bold text-xl'>Get In Touch</h2>
                <ul>
                    <li>📞 +9823923234</li>
                    <li >✉️ example234@gmail.com</li>
                    <li className='flex gap-1'>📍 <p>1234 Market Street, Suite 567, <br />Springfield, NY 12345, USA</p></li>
                </ul>
                </div>

            </div>

            {/* copyright section */}
            <div className='flex justify-center mt-16 border-t-[1px]'>
                <p className='mt-4'>Copyright 2025@Shopshphere.com - All right reserved</p>
            </div>
        </div>
    )
}

export default Footer
