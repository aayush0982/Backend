"use client"
import Navbar from '@/components/navbar'
import React, { useEffect, useState } from 'react'
import { OldTrips } from '../service/providingTrip';
import { useRouter } from "next/navigation";

const Page = () => {
    const [existingTrips, setexistingTrips] = useState([]);
    const router = useRouter();

    const fetchTrips = async () => {
        const userEmail = localStorage.getItem("userEmail");
        const result = await OldTrips(userEmail);
        console.log(result);
        setexistingTrips(result);

    }

    const toViewTrip = (id) => {
        // console.log(id)
        router.push(`/show_trip/${id}`);

    }

    useEffect(() => {
        fetchTrips()
    }, [])


    return (
        <div>
            <Navbar />
            <div className="px-16 mt-8 mb-8">
                <p className='font-bold text-4xl'>Old Trips</p>
                <div className='grid grid-cols-3 gap-8 mt-6'>
                    {existingTrips.length > 0 ? (
                        existingTrips.map((item, index) => (
                            <div key={index} className="cursor-pointer border rounded-md w-[29vw] px-6 py-4" onClick={() => toViewTrip(item.id)}>
                                <img className="h-[30vh] w-full rounded-md mb-2" src="/placeholder.png" alt="placeholder" />
                                <p className='font-semibold text-xl'>{item?.response?.trip_summary?.destination}</p>
                                <p className="font-medium text-[14px] text-gray-500">{new Date(item?.createdAt).toDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading trip details...</p>
                    )}
                </div>


            </div>
        </div>
    )
}

export default Page
