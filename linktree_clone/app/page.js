"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [route, setroute] = useState("")

  const navigate = ()=>{
    router.push(`/generate?handle=${route}`)
    // console.log(route)
  }

  return (
    <main className="bg-[#264F1A] min-h-[100vh] text-white grid grid-cols-2">
      <div className=" text-[#D2E722] flex flex-col justify-center items-start gap-4 ml-24">
        <p className="text-[80px] w-[40vw] leading-[80px]">Everything you are. In one, simple link in bio.</p>
        <p className="font-bold text-[16px] w-[40vw]">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        <div className=" flex gap-4">
          <input onChange={(e)=>setroute(e.target.value)} className="text-black h-10 px-4 rounded-lg" type="text" placeholder="Enter you handle"/>
          <button onClick={()=> navigate()} className="bg-gray-900 h-10 px-4 rounded-lg text-white font-bold">Generate</button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mr-24">
        <img src="/assets/herosection.png" alt="hero_section img" width={500}/>
      </div>
    </main>

  );
}
