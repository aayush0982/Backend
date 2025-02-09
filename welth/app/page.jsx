import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="mt-[120px]">
        <HeroSection />
      </div>

      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stats, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-blue-500 font-bold mb-2">{stats.value}</div>
                <div className="text-gray-600">{stats.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Everything you need to manage your finances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>

            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((howItWork, index) => (
              <div key={index} className="">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-8">{howItWork.icon}</div>
                <h3 className="text-2xl text-blue-500 font-semibold mb-2 text-center">{howItWork.title}</h3>
                <div className="text-gray-600 text-center">{howItWork.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
          <Carousel>
            <CarouselContent>
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 shadow-lg rounded-xl bg-white">
                    <CardContent className="space-y-4 ">
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full" />
                        <div>
                          <p>{testimonial.name}</p>
                          <p className="text-gray-600 text-[12px]">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{testimonial.quote}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="">
              <div className="bg-blue-500 text-white py-20 text-center">
                <h2 className="text-4xl mb-4 font-bold">Ready to Take Control of Your Finances?</h2>
                <p className="mb-8">Join thousands of users who are already managing their finances smarter with Welth</p>
                <Link href={"/dashboard"}>
                <Button className="bg-white text-blue-500 hover:animate-bounce hover:bg-blue-50">Start Free Trial</Button>
                </Link>
              </div>
      </section>
    </div>
  );
}
