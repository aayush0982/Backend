import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <div className='pb-20 px-4'>
            <div className="container mx-auto text-center">
                <h1 className='font-bold text-3xl md:text-5xl lg:text-[105px] bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent lg:h-[230px] md:h-fit h-fit'>
                    Manage Your Finances <br /> with Intelligence
                </h1>
                <p className='text-xl text-gray-550'>
                An Al-powered financial management platform that helps you track,<br /> analyze, and optimize your spending with real-time insights.
                </p>
                <div className='space-x-4 mt-10 mx-auto'>
                    <Button>Get Started</Button>
                    <Button variant="outline" >Watch Demo</Button>
                </div>
            </div>
            <div className=' mt-14'>
                <Image
                src={"/hero_sec_img.png"}
                width={1000}
                height={1200}
                alt='hero section image'
                className='h-86 w-86 rounded-[8px] mx-auto'
                />
            </div>
        </div>
    )
}

export default HeroSection
