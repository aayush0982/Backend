import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const POST = async (request) => {
    const body = await request.json();
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("linktree_clone");
    const collection = db.collection("links");
    const doc = await collection.findOne({handle: body.handle})
    if(doc){
        return NextResponse.json({success: false})
    }
    else{
        const result = await collection.insertOne(body);
        await client.close();
        return NextResponse.json({ success: true, error: false, message: "Your linktree has been generated!", result });
    }
};
