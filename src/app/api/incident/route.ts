import { connectToDB } from '@/utils/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import Incident from '@/models/incident';


export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();

        const {name,description,address}=body;
        console.log(name)
        console.log(description)
        console.log(address)
        const newincident=new Incident({name:name,description:description,address:address,createdAt:new Date()});
        await newincident.save();
        console.log(newincident)
        return NextResponse.json({ message: "Information successfully Received!Our team will respond shortly",body:newincident}, { status: 200 });
    }
    catch(err)
    {
        console.error("Error creating new incident data:", err);
        return NextResponse.json({ message: "Unable to create incident data!", err}, { status: 500 });
    }
}
