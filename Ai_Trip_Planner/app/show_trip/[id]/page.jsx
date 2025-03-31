"use client";

import { GetPlaceDetails } from "@/app/service/globalApi";
import { TripDetails } from "@/app/service/providingTrip";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const { id } = useParams();
    const [tripResult, settripResult] = useState(null)
    const Photo_Url = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
    const [FinalPhotoUrl, setFinalPhotoUrl] = useState();

    useEffect(() => {
        tripResult && GetPlacePhoto();
    }, [tripResult])


    useEffect(() => {
        console.log("Updated Photo URL:", FinalPhotoUrl);
    }, [FinalPhotoUrl]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: tripResult?.trip_summary?.destination
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)

            const Photourl = Photo_Url.replace('{NAME}', resp.data.places[0].photos[3].name);
            setFinalPhotoUrl(Photourl);
        })

    }



    const getTripDestails = async () => {
        const userEmail = localStorage.getItem("userEmail");
        const result = await TripDetails(userEmail, id)
        settripResult(result.response)
        // console.log(result.response)
    }

    useEffect(() => {
        getTripDestails();
    }, [])


    return (
        <div>
            <Navbar />

            {tripResult ?
                <div className="px-16 mt-8 mb-8">

                    {/* trip overview */}
                    <div>
                        <img
                            className="h-[60vh] w-full rounded-md object-cover"
                            src={FinalPhotoUrl ? FinalPhotoUrl : "/placeholder.png"}
                            alt="Trip Destination"
                            onError={(e) => { e.target.src = "/placeholder.png"; }}
                        />
                        <h1 className="font-bold text-3xl mt-2">{tripResult?.trip_summary?.destination}</h1>
                        <div className="flex gap-2 text-gray-400 text-[14px] font-semibold">
                            <p>{tripResult?.trip_summary?.duration},</p>
                            <p>{tripResult?.trip_summary?.budget_level?.charAt(0).toUpperCase() + tripResult?.trip_summary?.budget_level?.slice(1)} budget</p>
                        </div>
                    </div>

                    {/* itinerary details */}
                    <p className="mt-8 mb-2 font-semibold text-2xl">Trip Details</p>
                    {tripResult?.itinerary &&
                        Object.entries(tripResult.itinerary).map(([day, activities], index) => (
                            <div key={index} className="mt-4" >
                                <h2 className="font-semibold">Day {index + 1}</h2>
                                <div className="grid grid-cols-3 gap-8 mt-1">
                                    {["morning", "afternoon", "evening"].map((timeOfDay) => (
                                        activities[timeOfDay] && (
                                            <div key={timeOfDay} className="border rounded-md w-[25vw] px-6 py-3">
                                                <h3 className="font-medium capitalize mb-2">{timeOfDay}</h3>
                                                <img className="h-[30vh] rounded-md" src="/placeholder.png" alt="placeholder" />
                                                <p className="font-semibold text-[20px] mt-2">{activities[timeOfDay].place_name}</p>
                                                <p className="font-medium text-[14px] text-gray-500">{activities[timeOfDay].details}</p>
                                                <p className="font-medium text-[14px] text-gray-500">Best Time: {activities[timeOfDay].best_time_to_visit}</p>
                                                <p className="font-medium text-[14px] text-gray-500">Time Taken: {activities[timeOfDay].travel_time}</p>
                                                <p className="font-medium text-[14px] text-gray-500"> Ticaket Fee: {activities[timeOfDay].ticket_pricing}</p>
                                                <p className="font-medium text-[14px] text-gray-500">Rating: {activities[timeOfDay].rating} ⭐️</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}

                    {/* hotels */}
                    <p className="mt-8 mb-4 font-semibold text-2xl">Recommended Hotels</p>
                    <div className="grid grid-cols-3 gap-8">
                        {tripResult?.hotels?.map((hotel, index) => (
                            <div key={index} className="border rounded-md w-[25vw] px-6 py-6 mb-4">
                                <img src="/placeholder.png" alt={hotel.name} className="h-[30vh] object-cover rounded-md" />
                                <h2 className="font-semibold text-lg mt-2">{hotel.name}</h2>
                                <p className="font-medium text-[14px] text-gray-500">{hotel.address}</p>
                                <p className="font-medium text-[14px] text-gray-500">Fare: {hotel.price_per_night}</p>
                                <p className="font-medium text-[14px] text-gray-500">Rating: {hotel.rating} ⭐️</p>
                            </div>
                        ))}
                    </div>


                </div>
                : "Loading trip details..."}


        </div>
    );
};

export default Page;
