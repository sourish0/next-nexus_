import { connectToDB } from '@/utils/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import appoint from '@/models/appoint';

export async function GET() {
    try {
        await connectToDB();

        const appointments = await appoint.find({}).populate("creator");

        // console.log(appointments);

        return NextResponse.json({ message: "Appointments Fetched Successfully!", appointments }, { status: 200 });

    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json({ message: "Unable To Fetch Appointments!", error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();
        const { appointment, userID, doctorID } = body;
        const { name, lastname, email, petname, pettype, date, timeSlot, status } = appointment;

        console.log('Received data:', body);

        const newAppointment = new appoint({
            creator: userID,
            doctor: doctorID,
            name,
            lastname,
            email,
            petname,
            pettype,
            date,
            timeSlot,
            status
        });

        await newAppointment.save();

        return NextResponse.json({ message: "Appointment created successfully!", appointment: newAppointment }, { status: 200 });

    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json({ message: "Unable to create appointment!", error }, { status: 500 });
    }
}



