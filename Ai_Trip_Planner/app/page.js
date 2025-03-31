import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function Home() {
  return (
    <div className="px-8 mt-24 mb-8">

      <div className='shadow flex justify-between px-8 py-4 absolute top-0 w-full left-0'>
        <p className='font-medium text-3xl '>Logo</p>
        <Link href={"/login"}>
          <Button className={"cursor-pointer bg-green-600 text-white font-bold text-[16px] hover:bg-green-800"}>Login</Button>
        </Link>
      </div>

      {/* hero section */}
      <div className="flex items-center relative px-8 bg-[url('https://plus.unsplash.com/premium_photo-1668017178993-4c8fc9f59872?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-[80vh] rounded-lg">
        <div className="rounded-lg absolute inset-0 bg-black/10"></div>
        <div className=" z-10 text-white ">
          <p className="font-semibold text-[16px]">-- It's time to go 🚀</p>
          <p className="font-black text-5xl mt-4">Don't just imagine it,</p>
          <p className="font-black text-5xl mt-2">make it happen. Travel</p>
          <p className="font-semibold w-[40vw] mt-6">When planning your trip, do you dream of a resort with a breathtaking pool or a destination known for its lively happy hours and amazing drink deals?</p>
          <Link href={"/new_trip"}><Button className={"mt-8 bg-green-600 hover:bg-green-800 cursor-pointer px-6 py-5 test-white font-bold text-[16px]"}>Create New Trip</Button></Link>
        </div>

      </div>

      {/* about */}
      <div className="mt-24 flex justify-between items-center px-16">
        <div>
          <h3 className="text-4xl font-bold">About Us</h3>
          <p className="w-[38vw] mt-2">Travel planning can be overwhelming, but we believe it should be exciting and effortless. That’s why we’ve built an AI-powered trip planner that takes the guesswork out of creating the perfect travel experience. Whether you're embarking on a solo expedition, a romantic escape, a family vacation, or a group adventure, our intelligent system curates a personalized itinerary based on your interests, budget, and schedule</p>
          <Button className={"bg-green-600 hover:bg-green-800 text-white font-bold mt-3 cursor-pointer"}>See More</Button>
        </div>
        <div className="h-[70vh] w-[40vw] relative">
          <div className="absolute">
            <img className="rounded-md h-[240px] w-[240px] object-cover" src="https://images.unsplash.com/photo-1567071904534-d45af7ec2446?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about image" />
          </div>
          <div className="absolute top-16 right-14">
            <img className="rounded-md h-[240px] w-[240px] object-cover" src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about image" />
          </div>
          <div className="absolute bottom-14 ">
            <img className="rounded-md h-[240px] w-[240px] object-cover" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about image" />
          </div>
          <div className="absolute bottom-0 right-14">
            <img className="rounded-md h-[240px] w-[240px] object-cover" src="https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about image" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-24">
        <h3 className="text-4xl font-bold text-center">What We Offer</h3>
        <div className="grid grid-cols-4 gap-4  mt-8 px-16">

          <Card>
            <CardHeader>
              <CardTitle>🚀 AI-Powered Planning </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Say goodbye to endless research! Our AI analyzes your interests, budget, and time constraints to create a seamless itinerary.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>🌎 Personalized Travel </CardTitle>
            </CardHeader>
            <CardContent>
              <p>From hidden gems to popular attractions, we suggest destinations that match your travel style.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>💰 Budget-Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get cost-effective recommendations on flights, accommodations, and activities to make the most of your trip.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>🔍 Local Insights </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discover authentic local experiences, top-rated restaurants, and must-visit attractions with ease.</p>
            </CardContent>
          </Card>
        </div>

      </div>


      {/* testimonials */}
      <div className="mt-24 px-16">
        <h3 className="text-4xl font-bold text-center">What Our Customer Say</h3>
        <div className="mt-8">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className={"text-xl"}>Traveler-Friendly Experience </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"I’ve never had such a smooth travel planning experience! The AI suggested hidden gems I wouldn’t have found on my own. It felt like having a personal travel assistant. Highly recommend!"<br />
                      <b>— Emily R., Solo Traveler</b></p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className={"text-xl"}>Hassle-Free & Time-Saving </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"I used to spend hours researching destinations, but this AI trip planner did it all in minutes! My itinerary was perfectly tailored to my interests. Best decision ever!"<br />
                      <b>— Daniel M., Frequent Flyer</b></p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className={"text-xl"}>Traveler-Friendly Experience </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"I’ve never had such a smooth travel planning experience! The AI suggested hidden gems I wouldn’t have found on my own. It felt like having a personal travel assistant. Highly recommend!"<br />
                      <b>— Emily R., Solo Traveler</b></p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className={"text-xl"}>Hassle-Free & Time-Saving </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"I used to spend hours researching destinations, but this AI trip planner did it all in minutes! My itinerary was perfectly tailored to my interests. Best decision ever!"<br />
                      <b>— Daniel M., Frequent Flyer</b></p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className={"text-xl"}>Traveler-Friendly Experience </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"I’ve never had such a smooth travel planning experience! The AI suggested hidden gems I wouldn’t have found on my own. It felt like having a personal travel assistant. Highly recommend!"<br />
                      <b>— Emily R., Solo Traveler</b></p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className={"text-xl"}>Hassle-Free & Time-Saving </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"I used to spend hours researching destinations, but this AI trip planner did it all in minutes! My itinerary was perfectly tailored to my interests. Best decision ever!"<br />
                      <b>— Daniel M., Frequent Flyer</b></p>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* footer */}
      <div className="mt-24 px-16 pb-16 pt-8 bg-gray-50 shadow-2xl h-fit rounded-lg">
        <div className="flex gap-16 justify-around">
          <div>
            <p className="font-semibold text-3xl">Logo</p>
          </div>
          <div>
            <p className="font-bold">Useful Links</p>
            <div className="flex flex-col gap-1 ">
              <p>Home</p>
              <p>Create New Trip</p>
              <p>Saved Trip</p>
              <p>Features</p>
              <p>About</p>
            </div>
          </div>
          <div>
            <p className="font-bold">Useful Links</p>
            <div className="flex flex-col gap-1 ">
              <p>Home</p>
              <p>Create New Trip</p>
              <p>Saved Trip</p>
              <p>Features</p>
              <p>About</p>
            </div>
          </div>
          <div>
            <p className="font-bold">Follow us</p>
            <div className="flex gap-4">
              <p><img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="" height={24} width={24} /></p>
              <p><img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="" height={24} width={24} /></p>
              <p><img src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="" height={24} width={24} /></p>
              <p><img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="" height={24} width={24} /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
