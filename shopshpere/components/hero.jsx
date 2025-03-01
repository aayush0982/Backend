import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='flex justify-between items-center border-[.5px] border-black'>
      <div className='flex flex-col gap-6 pl-[160px]'>
        <div>
        <div className='flex gap-2 items-center justify-start'>
            <p className='bg-black w-[80px] h-[1px]'></p>
            <p className='text-sm'>Discover Deals You’ll Love </p>
        </div>
        <p className='font-bold text-6xl leading-[72px]'>Shop Smarter, <br />
        Live Better!</p>
        </div>
        <Button className="px-8 w-[160px] h-10 font-bold py-2">Shop Now ＞</Button>
      </div>


      <div className=''>
        <Image src="/assets/hero_img.png" width={640} height={80} alt='gero sec img'/>
      </div>
    </div>
  )
}

export default Hero
