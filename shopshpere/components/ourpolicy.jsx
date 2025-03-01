import React from 'react'
import Title from './title'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { assets } from '@/public/product_assets'


const OurPolicy = () => {
    return (
        <div className='my-24'>

            <div className='text-5xl'>
                <Title text1={"Our"} text2={"Policy"} />
            </div>

            <div className='grid grid-cols-3 gap-8 mt-10'> 
                <Card>
                    <CardHeader>
                        <img src={assets.exchange_icon} alt="policy icon" width={32} height={32}/>
                        <CardTitle>Easy Exchange Policy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Exchange products easily for size, defects, or issues with a quick and simple process</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <img src={assets.quality_icon} alt="policy icon" width={32} height={32}/>
                        <CardTitle>7-Day Return Policy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Return unused products within 7 days for a refund or store credit</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <img src={assets.support_img} alt="policy icon" width={32} height={32}/>
                        <CardTitle>Best Customer Support Policy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Get 24/7 assistance for queries, issues, or help with your orders</p>
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}

export default OurPolicy
