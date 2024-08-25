import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import appoint from "@/models/appoint";

export async function GET(req, {params}) {

    const id = params.id
    
    try {
        await connectToDB();
        const appointment = await appoint.find({creator: id}).populate("doctor").select("-password");
        return NextResponse.json({ message: "Appointment Fetched Successfully!", appointment }, { status: 200 });

    } catch (error) {
        console.error("Error fetching appointment:", error);
        return NextResponse.json({ message: "Unable To Fetch Appointment!", error }, { status: 500 });
    }

}