"use client"
import React from 'react';
import Image from 'next/image'; // For optimized image loading

const page = () => {
    return (
        <div className="font-sans"> {/* Apply a default font or use a specific one */}


            {/* Hero Section */}
            <section className="bg-gray-100 py-12 px-6 md:px-24 text-center mt-[120px] min-w-full"> {/* Added padding and responsive padding */}
                <h1 className="text-4xl font-bold mb-4">Get more with Linktree</h1>
                <p className="text-lg w-[55vw] m-auto">
                    Help your followers discover, enjoy and support everything you have to offer when you add
                    Linktree's 'Link in Bio' to your Instagram today.
                </p>

            </section>

            {/* Features Section */}
            <section className="py-12 px-6 md:px-24 bg-white"> {/* Added padding and responsive padding */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Grid for responsiveness */}

                    {/* Feature Card 1 */}
                    <div className="bg-purple-100 rounded-lg p-6">
                        <Image src="/assets/moreclicks.png" alt="More Clicks" width={80} height={80} /> {/* Replace with your image path */}
                        <h2 className="text-xl font-bold mt-4 mb-2">More clicks</h2>
                        <p>Get more clicks on your content-from blog posts to socials and everything in between.</p>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="bg-yellow-100 rounded-lg p-6">
                        <Image src="/assets/follower.png" alt="More Engagement" width={80} height={80} /> {/* Replace with your image path */}
                        {/* <div className="bg-gray-300 rounded-md w-20 h-6 mt-2">
              <p className="text-center text-xs">PARANORMAL</p>
            </div> */}
                        <h2 className="text-xl font-bold mt-4 mb-2 ">More engagement</h2>
                        <p>Let your followers enjoy all content and important links from one easy spot with just a few clicks.</p>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="bg-red-100 rounded-lg p-6">
                        <Image src="/assets/money.png" alt="More Money" width={45} height={50} /> {/* Replace with your image path */}
                        <h2 className="text-xl font-bold mt-4 mb-2">More money</h2>
                        <p>Sell your products, take service payments and add a "Tip Jar" to earn money with your content.</p>
                    </div>

                </div>
            </section>

            <div className="py-12 px-6 md:px-24 flex flex-col justify-center items-center "> {/* Removed section, added padding to the div */}
                <h2 className="text-3xl font-bold mb-4 text-center md:text-left">More data, more growth</h2> {/* Adjusted heading styles */}
                <p className="text-lg text-center  w-[60vw]"> {/* Added text size, margin, and alignment */}
                    Track your clicks, measure click-through rates, and analyze conversions to make data-driven decisions that increase engagement and sales.  Understanding your audience's behavior and optimizing your content strategy based on concrete data is crucial for maximizing your online presence and achieving your business goals.  Gain valuable insights into which links are performing best, identify areas for improvement, and refine your approach to drive even greater results.
                </p>
            </div>


        </div>
    );
};

export default page;