"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Form, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { accountSchema } from '@/app/lib/schema'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import useFetch from './hooks/use-fetch'
import { createAccount, getUserAccounts } from '@/actions/dashboard'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'



// here we use hook form for easy use of form , zod help in validation library and hookform/resolvers help to connect them

const CreateDrawerAccount = ({ children }) => {
    // used open usestate to handle the  opening of drawer
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        },
    });



    const onSubmit = async (data) => {
        console.log("Submitting data:", data);
        await createAccountFn(data);
    };


    const { data: newAccount, error, fn: createAccountFn, loading: createAccountLoading } = useFetch(createAccount)

    useEffect(() => {
        if (newAccount && !createAccountLoading) {
            toast.success("Account created successfully");
            reset();
            setOpen(false);
        }
    }, [createAccountLoading, newAccount])

    useEffect(() => {
        if (error) {
            console.error("Error in CreateDrawerAccount:", error);
            toast.error(error.message || "Failed to create new account");
        }
    }, [error]);

    return (
        <div>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>{children}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Create New Account</DrawerTitle>
                        <DrawerDescription>
                            <div className='px-4 pb-4'>
                                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

                                        <div className='space-y-1'>
                                            <label htmlFor="name" className='text-sm font-bold'>Account Name</label>
                                            <Input id="name"
                                                className=" w-full md:w-[45vw]"
                                                placeholder="Enter account name"
                                                {...register("name")} />
                                            {errors.name && <p className='text-sm font-semibold text-red-600'>{errors.name.message}</p>}
                                        </div>


                                        <div className='w-full md:w-[45vw] space-y-1 '>
                                            <label htmlFor="type" className='text-sm font-bold'>Account Type</label>
                                            <Select onValueChange={(value) => setValue("type", value)} defaultValue={watch("type")}>
                                                <SelectTrigger id="type" >
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CURRENT">Current</SelectItem>
                                                    <SelectItem value="SAVINGS">Savings</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && <p className='text-sm font-semibold text-red-600'>{errors.type.message}</p>}
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

                                        <div className='space-y-1'>
                                            <label htmlFor="balance" className='text-sm font-bold'>Initial Balance</label>
                                            <Input id="balance"
                                                className=" w-full md:w-[45vw]"
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                {...register("balance")} />
                                            {errors.balance && <p className='text-sm font-semibold text-red-600'>{errors.balance.message}</p>}
                                        </div>

                                        <div className='w-full md:w-[45vw] space-y-1 '>
                                            <label htmlFor="isDefault" className='text-sm font-bold'>Set As Default Account</label>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-left'>This account will be selected as default account</p>
                                                <Switch
                                                    id="isDefault"
                                                    onCheckedChange={(checked) => setValue("isDefault", Boolean(checked))}
                                                    checked={watch("isDefault")}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 mt-8 justify-center'>
                                        <DrawerClose className=''>
                                            <Button type="button" variant="outline">
                                                Cancel
                                            </Button>
                                        </DrawerClose>
                                        <Button type="submit" disabled={createAccountLoading}>
                                            {createAccountLoading ?
                                                (<>
                                                    <Loader2 className='animate-spin' />
                                                    Creating...
                                                </>) :
                                                ("Create Account")}
                                        </Button>

                                    </div>
                                </form>
                            </div>
                        </DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

export default CreateDrawerAccount
