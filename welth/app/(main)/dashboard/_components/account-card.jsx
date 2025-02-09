import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from '@/components/ui/switch';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';


// here we use "_" before components so that next js ignore this folder and do not use in routes
const AccountCard = ({ account }) => {
    const { name, type, balance, id, isDefault } = account;
    return (
        <Card>
            <Link href={`/account/${id}`}>
                <CardHeader className="flex flex-row gap-4 justify-between items-center pb-2 space-y-0 pt-4">
                    <CardTitle className="font-medium">{name}</CardTitle>
                    <Switch checked={Boolean(isDefault)} />
                </CardHeader>
                <CardContent className="pb-2">
                    <div className='text-xl font-bold'>
                        ${parseFloat(balance).toFixed(2)}
                    </div>
                    <p className='text-sm text-gray-400'>{type.charAt(0) + type.slice(1).toLowerCase()} Account</p>
                </CardContent>
                <CardFooter className="flex flex-row gap-4 justify-between items-center text-sm pb-2">
                    <div>
                        <div className="flex flex-row justify-between items-center gap-1">
                            <ArrowDownLeft className='text-green-500 h-4 w-4' />
                            Income
                        </div>
                        <p className='font-medium text-base'>1230</p>
                    </div>
                    <div>
                        <div className="flex flex-row  justify-between items-center gap-1">
                            <ArrowUpRight className='text-red-500 h-4 w-4' />
                            Expense
                        </div>
                        <p className='font-medium text-base'>1230</p>
                    </div>
                </CardFooter>
            </Link>
        </Card>

    )
}

export default AccountCard
