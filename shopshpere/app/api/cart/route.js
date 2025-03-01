
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
    const user = await currentUser();

    if(!user){
        return NextResponse.json({error:"Unauthorised user"});
    }

    const {cartData} = await req.json();

    const updateUser = await db.user.update({
        where:{clerkUserId: user.id},
        data : {cartData: cartData},
    });

    return NextResponse.json({success: true, user: updateUser});
        
    } 
    catch (error) {
        return NextResponse.json({success:false, error: "can't update cartitems"})
        
    }


    
}