"use client"
import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/app/login/loginaction'

const Navbar = () => {
  const signout=()=>{
    localStorage.removeItem("userEmail");
    logout();
  }
  return (
    <div>
      <div className='border border-mb-gray-600 flex justify-between px-8 py-4'>
        <p className='font-medium text-3xl '>Logo</p>
        <Button className="cursor-pointer bg-green-600 text-white font-bold text-[16px] hover:bg-green-800" onClick={() => signout()}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar
