import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDB';
import Doctor from '@/models/doctor';

export async function GET() {
  
    try {

        await connectToDB()
        const doctors = await Doctor.find();
        return NextResponse.json({ message: "Successfully Got All Doctors!", doctors }, { status: 200 });

    } catch (error) {
        console.error("Error fetching Docs:", error);
        return NextResponse.json({ message: "Unable To Get Doctors!", error }, { status: 500 });
    }

}