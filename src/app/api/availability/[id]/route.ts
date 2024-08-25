import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import appoint from "@/models/appoint";

export async function GET(req, { params }) {
    
    const { id } = params;

    try {

        connectToDB()
        const appointments = await appoint.find({ doctorID: id, status: 'accepted' });
        return NextResponse.json({message: 'Appointments found', appointments}, {status: 200});

    } catch (error) {
        console.log("Unable To Fetch Appointments: ", error);
        return NextResponse.json({message: 'Unable To Fetch Appointments'}, {status: 500});
    }
}