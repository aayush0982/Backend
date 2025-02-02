"use client"
import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'next/navigation'



const page = () => {

  const sparams = useSearchParams()

  const [handle, sethandle] = useState(sparams.get('handle'))
  const [picurl, setpicurl] = useState("")
  const [linkurl, setlinkurl] = useState("")
  const [linktext, setlinktext] = useState("")
  const [desc, setdesc] = useState("")
  const [links, setlinks] = useState([{ lintext: "", linkurl: "" }])
  // console.log(handle,picurl,linktext,linkurl,desc)

  const addLink = () => {
    setlinks(links.concat([{ lintext: "", linkurl: "" }]))
    console.log("added")
  }

  const handleChange = (index, linktext, linkurl) => {
    setlinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { linktext, linkurl }
        }
        else {
          return item
        }
      })
    })
  }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "handle": handle,
      "pic": picurl,
      "links": links,
      "desc": desc
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const temp = await fetch("http://localhost:3000/api/add", requestOptions)
    const result = await temp.json()
    if(!result.message){
      alert("handle already exist!")
    }

    console.log("added result")
    sethandle("")
    setdesc("")
    setpicurl("")
    setlinks([{ lintext: "", linkurl: "" }])
  }

  return (
    <div className='min-h-[100vh] grid grid-cols-2 bg-green-300'>

      <div className='flex flex-col justify-center items-start ml-[160px] gap-[16px]'>
        <h1 className='font-bold text-[32px] leading-[32px]'>Create Your Lniktree</h1>
        <div className='flex flex-col gap-[4px]'>
          <h2 className='font-bold text-[16px]'>Step1. Enter Your Handle Name</h2>
          <input value={handle || ""} onChange={(e) => { sethandle(e.target.value) }} className='text-black h-10 px-4 rounded-lg w-[14vw]' type="text" placeholder='Enter Your Handle' />
        </div>

        <div className='flex flex-col gap-[4px]'>
          <h2 className='font-bold text-[16px]'>Step2. Add Pic URL</h2>
          <input value={picurl || ""} onChange={(e) => { setpicurl(e.target.value) }} className='text-black h-10 px-4 rounded-lg w-[14vw]' type="text" placeholder='Enter Pic URL' />
        </div>

        <div className='flex flex-col gap-[4px]'>
          <h2 className='font-bold text-[16px]'>Step3. Add Links</h2>
          <div className=' flex flex-col gap-[16px] max-h-[140px] overflow-y-auto'>
            {links.map((item, index) => {
              return <div key={index} className='flex gap-[24px]'>
                <input value={item.linktext || ""} onChange={(e) => { handleChange(index, e.target.value, item.linkurl) }} className='text-black h-10 px-4 rounded-lg w-[14vw]' type="text" placeholder='Enter Link Name' />
                <input value={item.linkurl || ""} onChange={(e) => { handleChange(index, item.linktext, e.target.value) }} className='text-black h-10 px-4 rounded-lg w-[14vw]' type="text" placeholder='Enter URL' />
              </div>
            })}

          </div>
          <button onClick={() => addLink()} className='bg-gray-900 h-10 px-4 rounded-lg text-white font-bold w-[12vw] mt-2'>+ Add More Link</button>
        </div>

        <div className='flex flex-col gap-[4px]'>
          <h2 className='font-bold text-[16px]'>Step4. Add Description and Finalise</h2>
          <input value={desc || ""} onChange={(e) => { setdesc(e.target.value) }} className='text-black h-10 px-4 rounded-lg w-[20vw]' type="text" placeholder='Enter Description' />
          <button disabled={picurl=="" || handle==""} onClick={() => submitLinks()} className=' disabled:bg-slate-500 bg-gray-900 h-10 px-4 rounded-lg text-white font-bold w-[12vw] mt-2'>Create  Linktree</button>
        </div>

      </div>


      <div className='flex flex-col justify-center items-center mr-[160px]'>
        <img src="/assets/linktree.png" alt="linktree" />
      </div>

    </div>
  )
}

export default page
