"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [p_name, setp_name] = useState("");
    const [p_desc, setp_desc] = useState("");
    const [p_price, setp_price] = useState("");
    const [p_cat, setp_cat] = useState("Men");
    const [p_subcat, setp_subcat] = useState("Topwear");
    const [bestseller, setbestseller] = useState(false);
    const [sizes, setsizes] = useState([]);
    const [images, setimages] = useState([]);

    const [img1, setimg1] = useState("");
    const [img2, setimg2] = useState("");
    const [img3, setimg3] = useState("");
    const [img4, setimg4] = useState("");


    const handleImages = () => {
        let temp = [];
        if (img1) temp.push(img1);
        if (img2) temp.push(img2);
        if (img3) temp.push(img3);
        if (img4) temp.push(img4);

        setimages(temp);
    }

    const handleClick = async (e) => {

        handleImages()
        e.preventDefault();

        if (images.length === 0) {
            alert("Please provide at least one image link.");
            return;
        }
        if (sizes.length === 0) {
            alert("Please provide at least one product size.");
            return;
        }
        if (!p_name.trim()) {
            alert("Product name is required.");
            return;
        }
        if (!p_desc.trim()) {
            alert("Product description is required.");
            return;
        }
        if (!p_price.trim()) {
            alert("Product price is required.");
            return;
        }

        // console.log(p_name, p_desc, p_price, p_cat, p_subcat, bestseller, sizes, images);

        try {
            const response = await fetch("/api/product", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    p_name,
                    p_desc,
                    p_price,
                    images,
                    p_cat,
                    p_subcat,
                    sizes,
                    bestseller,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
            setp_name("");
            setp_desc("");
            setp_price("");
            setp_cat("Men");
            setp_subcat("Topwear");
            setbestseller(false);
            setimg1("");
            setimg2("");
            setimg3("");
            setimg4("");
            setimages([]);
            setsizes([]);
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("Failed to add product.");
        }
    }

      

    return (
        <div className='mt-20 px-24 '>

            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold'>Upload Image Link</h2>
                <div className='flex gap-4'>
                    <input onChange={(e) => setimg1(e.target.value)} className='outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-md px-2 py-2 w-[480px]' type="text" placeholder='Upload Link 1' />
                    <input onChange={(e) => setimg2(e.target.value)} className='outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-md px-2 py-2 w-[480px]' type="text" placeholder='Upload Link 2' />
                </div>
                <div className='flex gap-4'>
                    <input onChange={(e) => setimg3(e.target.value)} className='outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-md px-2 py-2 w-[480px]' type="text" placeholder='Upload Link 3' />
                    <input onChange={(e) => setimg4(e.target.value)} className='outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-md px-2 py-2 w-[480px]' type="text" placeholder='Upload Link 4' />
                </div>
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <h2 className='font-semibold'>Product Name</h2>
                <input onChange={(e) => setp_name(e.target.value)} className='outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-md px-2 py-2 w-[480px]' type="text" placeholder='Enter Product Name' />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <h2 className='font-semibold'>Product Description</h2>
                <input onChange={(e) => setp_desc(e.target.value)} className='outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-md px-2 pb-16 w-[480px] pt-2' type="text" placeholder='Enter Product Description' />
            </div>

            <div className='flex gap-8 mt-4'>
                <div>
                    <h2 className='outline-none font-semibold'>Product Category</h2>
                    <select onChange={(e) => setp_cat(e.target.value)} className='border-[1px] px-1 py-1 w-32 mt-2 border-black rounded-sm'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <h2 className='font-semibold'>Product Subcategory</h2>
                    <select onChange={(e) => setp_subcat(e.target.value)} className='outline-none border-[1px] px-1 py-1 w-32 mt-2 border-black rounded-sm'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <h2 className='font-semibold'>Product Price</h2>
                    <input onChange={(e) => setp_price(e.target.value)} className='mt-2 outline-none border border-black border-t-1 border-b-1 border-l-1 border-r-1 rounded-sm px-2 pb-1 w-32 pt-1' type="text" placeholder='Enter Price' />
                </div>
            </div>

            <div className='mt-4'>
                <h2 className='font-semibold'>Product Sizes</h2>
                <div className='flex gap-2 mt-2'>
                    <div onClick={() => setsizes(prev => prev.includes("S") ? prev.filter(item => item != "S") : [...prev, "S"])}>
                        <p className='bg-slate-200 px-3 py-1 cursor-pointer rounded-md'>S</p>
                    </div>
                    <div onClick={() => setsizes(prev => prev.includes("M") ? prev.filter(item => item != "M") : [...prev, "M"])}>
                        <p className='bg-slate-200 px-3 py-1 cursor-pointer rounded-md'>M</p>
                    </div>
                    <div onClick={() => setsizes(prev => prev.includes("L") ? prev.filter(item => item != "L") : [...prev, "L"])}>
                        <p className='bg-slate-200 px-3 py-1 cursor-pointer rounded-md'>L</p>
                    </div>
                    <div onClick={() => setsizes(prev => prev.includes("XL") ? prev.filter(item => item != "XL") : [...prev, "XL"])}>
                        <p className='bg-slate-200 px-3 py-1 cursor-pointer rounded-md'>XL</p>
                    </div>
                    <div onClick={() => setsizes(prev => prev.includes("XXL") ? prev.filter(item => item != "XXL") : [...prev, "XXl"])}>
                        <p className='bg-slate-200 px-3 py-1 cursor-pointer rounded-md'>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-4'>
                <input onChange={() => setbestseller(prev => !prev)} type="checkbox" id='bestseller' />
                <h2 className='font-semibold'>Add to Bestseller</h2>
            </div>

            <Button onClick={handleClick} className="mt-8">Add Product</Button>

        </div>
    )
}

export default Page
