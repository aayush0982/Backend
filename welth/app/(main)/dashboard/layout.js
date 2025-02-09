import React, { Suspense } from 'react'
import DashboardPage from './page'
import {BarLoader} from "react-spinners" 

const DashboardLayout = () => {
    return (
        <div className='px-5 '>
            <h1 className='text-center text-5xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent'>Dashboard</h1>
            {/* suspense used for showing loading indicator when laoding or using api's */}
            <Suspense fallback={<BarLoader/>}>
                <DashboardPage />
            </Suspense>
        </div>
    )
}

export default DashboardLayout
