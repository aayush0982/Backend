"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateTravelPlan } from '../service/AiModel';
import { AddTrip } from '../service/tripToDatabase';
import { useRouter } from "next/navigation";





const GooglePlacesAutocomplete = dynamic(() => import('react-google-places-autocomplete'), { ssr: false });

const Page = () => {
  const [place, setplace] = useState()
  const [mem, setmem] = useState()
  const [formData, setformData] = useState({})
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChage = (name, value) => {
    setformData(
      {
        ...formData,
        [name]: value,
      }
    )
  }

  const prompt = "Generate a detailed **{noOfDays}-day travel plan** for a **{people} visiting {location} on a {budget} budget";


  const addTripToDatabase = async (tripDetails) => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const trip = await AddTrip(userEmail, tripDetails);
      console.log(trip);
      router.push(`/show_trip/${trip.id}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  }


  const generateTrip = async (formData) => {
    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.travel) {
      notify2();
      console.log("error")
      return
    }
    if (formData?.noOfDays > 15) {
      notify();
      console.log("error")
      return
    }
    setLoading(true);
    const finalPrompt = prompt
      .replace('{location}', formData?.location?.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{people}', formData?.travel)
      .replace('{budget}', formData?.budget)

    console.log(finalPrompt)
    try {
      const tripPlan = await generateTravelPlan(finalPrompt);
      console.log(tripPlan);
      addTripToDatabase(tripPlan);
    }
    catch (error) {
      console.error("Error generating trip:", error);
    }
  }


  const notify = () => toast.error("Please fill no. of days less then 15");
  const notify2 = () => toast.error("Please fill all details");

  useEffect(() => {
    console.log(formData)
  }, [formData])


  return (
    <div>
      <Navbar />
      <ToastContainer />

      <div className='px-16 mt-8 mb-8'>

        <div>
          <p className='font-bold text-3xl mb-4'>Tell us about your trip preference</p>
          <div className='rounded-lg' >
            <GooglePlacesAutocomplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
              selectProps={
                {
                  place,
                  onChange: (v) => { setplace(v), handleInputChage('location', v) }
                }
              } />
          </div>
        </div>
        <div className='mt-8'>
          <p className='font-bold text-3xl mb-4'>How many days are planning your trip</p>
          <input className='border px-4 py-[6px] w-full rounded-sm focus:outline-none' type="number" placeholder='Ex.3' min={"1"} max={"15"} onChange={(e) => handleInputChage('noOfDays', e.target.value)} />
        </div>


        <div className='mt-8'>
          <p className='font-bold text-3xl mb-4'>What is your budget?</p>
          <div className='grid grid-cols-3 gap-16'>
            <Card onClick={() => handleInputChage("budget", "Cheap")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader >
                <CardTitle>💵</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Cheap</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>Stay consciuos of cost</p>
              </CardContent>
            </Card>

            <Card onClick={() => handleInputChage("budget", "Moderate")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader>
                <CardTitle>💷</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Moderate</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>Keep cost on the average side</p>
              </CardContent>
            </Card>

            <Card onClick={() => handleInputChage("budget", "Luxury")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader>
                <CardTitle>💰</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Luxury</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>Don't worry about cost</p>
              </CardContent>
            </Card>


          </div>
        </div>

        <div className='mt-8'>
          <p className='font-bold text-3xl mb-4'>Who do you plan on traveling with on your next adventure?</p>
          <div className='grid grid-cols-4 gap-16'>
            <Card onClick={() => handleInputChage("travel", "1 People")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader>
                <CardTitle>✈️</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Just Me</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>A sole traveles in exploration</p>
              </CardContent>
            </Card>

            <Card onClick={() => handleInputChage("travel", "2 People")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader>
                <CardTitle>🥂</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Couple</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>Two traveles in tandem</p>
              </CardContent>
            </Card>

            <Card onClick={() => handleInputChage("travel", "3 to 5 People")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader>
                <CardTitle>🏡</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Family</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>A group of fun loving adv</p>
              </CardContent>
            </Card>

            <Card onClick={() => handleInputChage("travel", "5 to 6 People")} className={"hover:shadow-xl  cursor-pointer"}>
              <CardHeader>
                <CardTitle>🚎</CardTitle>
                <CardDescription className={"font-bold text-xl text-black"}>Friends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-500 font-medium'>A bunch of thrill-seekes</p>
              </CardContent>
            </Card>


          </div>
        </div>

        <Button onClick={() => generateTrip(formData)} disabled={loading} className={"cursor-pointer bg-green-600 text-white font-bold text-[16px] hover:bg-green-800 mt-8 py-6 "}>
          {loading ? "Geneating Trip..." : "Generate Trip"}
        </Button>


      </div>

    </div>
  )
}

export default Page
