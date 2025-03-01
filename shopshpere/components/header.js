"use client"
import React, { useContext } from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ShopContext } from '@/context/shopcontext'

const Header = () => {
    const { showSearch, setshowSearch, cartitemCount } = useContext(ShopContext);
    return (
        <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
            <nav className='container mx-auto py-4 flex items-center justify-between '>
                <div>
                    <Link href={"/"}>
                        <div className='flex gap-2 items-center'>
                            <Image src="/assets/logomain.png" width={40} height={40} alt='logo_img' />
                            <span className='font-bold text-2xl'>Shopsphere</span>
                        </div>
                    </Link>
                </div>
                <ul className='flex gap-8 font-semibold'>
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/collections'>Collections</Link></li>
                    <li><Link href='/order'>My Orders</Link></li>
                    <li><Link href='/about'>About</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                </ul>

                <div className='flex gap-6 items-center'>
                    <Image className='cursor-pointer' onClick={(e) => setshowSearch(true)} src="/assets/search_icon.png" width={20} height={20} alt='search_icon' />
                    <Link href="/cart" className='relative'>
                        <Image src="/assets/cart_icon.png" width={20} height={20} alt='cart_icon' />
                        <p className='absolute text-sm w-4 h-4 flex items-center justify-center top-3 left-3 rounded-full text-white bg-black'>{cartitemCount}</p>
                    </Link>
                    <Link href="/addproduct">
                        <Image src="/assets/addproduct.png" width={24} height={24} alt='add product' />
                    </Link>

                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Login</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

export default Header
