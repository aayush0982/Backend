"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const showPath = usePathname()
    const showNav = ["/", "/generate", "/about", "/contact"].includes(showPath)
    return (<>
        {showNav && <div className="h-12 flex items-center px-6 w-[75%] bg-white rounded-3xl absolute top-6 right-[13vw] justify-between shadow-lg">
            <Link href="/">
            <Image src="/assets/logo.svg" alt="Logo" width={100} height={50} />
            </Link>
            <ul className="flex gap-4">
                <li className="hover:cursor-pointer">
                    <Link href="/">Home</Link>
                </li>
                <li className="hover:cursor-pointer">
                    <Link href="/generate">Generate</Link>
                </li>
                <li className="hover:cursor-pointer">
                    <Link href="/about">About</Link>
                </li>
                <li className="hover:cursor-pointer">
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </div>}</>
    )
}

export default Navbar
