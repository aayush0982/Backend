"use client"
import ProductItems from '@/components/productitems';
import { ShopContext } from '@/context/shopcontext'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
    const { products } = useContext(ShopContext);
    const [filterProducts, setfilterProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [sortBy, setsortBy] = useState('relevant');
    const [search, setsearch] = useState('');
    const [fetchedProducts, setfetchedProducts] = useState([]);
    // const [showSearch, setshowSearch] = useState(true);

    const { showSearch, setshowSearch } = useContext(ShopContext);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            let tempcategory = category.filter(item => item !== e.target.value);
            setcategory(tempcategory);
        }
        else {
            setcategory([...category, e.target.value]);
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            let tempsubCategory = subCategory.filter(item => item !== e.target.value);
            setsubCategory(tempsubCategory);
        }
        else {
            setsubCategory([...subCategory, e.target.value]);
        }
    }

    const sortProducts = () => {
        const val = sortBy;
        // console.log(val);
        let tempproducts = filterProducts.slice();
        if (val === 'low-high') {
            setfilterProducts(tempproducts.sort((a, b) => (a.price - b.price)));
        }
        else if (val === 'high-low') {
            setfilterProducts(tempproducts.sort((a, b) => (b.price - a.price)));
        }
        else {
            applyFilter();
        }
    }
    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/product");
            if (!response.ok) throw new Error("Failed to fetch products");

            const data = await response.json();
            console.log("Fetched products:", data);
            setfetchedProducts(data)
            return fetchedProducts;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchProducts()
        // console.log(fetchedProducts)
    }, [])
    


    const applyFilter = () => {
        let tempproducts = [...products, ...fetchedProducts];

        if (search && showSearch) {
            tempproducts = tempproducts.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            tempproducts = tempproducts.filter(i => category.includes(i.category));
        }
        if (subCategory.length > 0) {
            tempproducts = tempproducts.filter(i => subCategory.includes(i.subCategory));
        }
        // console.log(tempproducts);
        setfilterProducts(tempproducts);

    }

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])


    useEffect(() => {
        sortProducts()
    }, [sortBy])


    return (
        <div className='mt-24 px-24 relative'>

            {/* serchbar */}
            {showSearch ?
                <div className='flex gap-4 items-center justify-center'>
                    <div className='inline-flex border-[2px] px-4 py-2 rounded-full text-lg font-medium w-3/4 justify-between'>
                        <input className='w-3/4 outline-none' type="text" placeholder='Enter product name' value={search} onChange={(e) => setsearch(e.target.value)} />
                        <img src="/assets/search_icon.png" alt="search_icon" width={20} height={16} />
                    </div>
                    <img onClick={(e) => setshowSearch(false)} className='inline cursor-pointer w-3 h-4' src="/assets/cross_icon.png" alt="cancel_icon" />
                </div>
                : null}

            <div className='mt-20 px-24 flex'>
                {/* left side */}
                <div className='flex flex-col gap-2 px-8 py-4 w-fit h-full'>
                    <p className='font-semibold text-lg'>Filters</p>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p>Cateogories</p>
                            <div>
                                <p className='flex gap-2'><input type="checkbox" value={'Men'} onChange={toggleCategory} />Men</p>
                                <p className='flex gap-2'><input type="checkbox" value={'Women'} onChange={toggleCategory} />Women</p>
                                <p className='flex gap-2'><input type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids</p>
                            </div>
                        </div>

                        <div>
                            <p>Types</p>
                            <div>
                                <p className='flex gap-2'><input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear</p>
                                <p className='flex gap-2'><input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear</p>
                                <p className='flex gap-2'><input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear</p>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-col'>
                        <p>Sort By</p>
                        <div>
                            <p className='flex gap-2'><input type="checkbox" value={'relevant'} onChange={(e) => setsortBy(e.target.value)} />Relevant</p>
                            <p className='flex gap-2'><input type="checkbox" value={'low-high'} onChange={(e) => setsortBy(e.target.value)} />Low to High</p>
                            <p className='flex gap-2'><input type="checkbox" value={'high-low'} onChange={(e) => setsortBy(e.target.value)} />High to Low</p>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className='grid grid-cols-5 gap-2 gapy-2 pl-8 border-l-[1px] h-[100vh] overflow-y-auto'>
                    {filterProducts.map((items, index) => (
                        <ProductItems key={index} id={items._id || items.id} name={items.name} price={items.price} image={items.image} />
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Page
