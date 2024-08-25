import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import appoint from "@/models/appoint";

export async function GET(req: NextRequest, {params}) {

    const id = params.id
    
    try {
        await connectToDB();
        const appointment = await appoint.findById(id).populate("creator").populate("doctor").select("-password");
        return NextResponse.json({ message: "Appointment Fetched Successfully!", appointment }, { status: 200 });

    } catch (error) {
        console.error("Error fetching appointment:", error);
        return NextResponse.json({ message: "Unable To Fetch Appointment!", error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, {params}) {

    const id = params.id
    
    try {
        await connectToDB();
        const appointment = await appoint.findByIdAndDelete(id)
        return NextResponse.json({ message: "Appointment Deleted Successfully!", appointment }, { status: 200 });

    } catch (error) {
        console.error("Error fetching appointment:", error);
        return NextResponse.json({ message: "Unable To Delete Appointment!", error }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest, { params }) {

    const id = params.id;
    const reqBody = await req.json();
    const { status } = reqBody;
  
    try {
      await connectToDB();
      const updatedAppointment = await appoint.findByIdAndUpdate(
        id,
        { status: status },
        { new: true } // This returns the updated document
      );
      return NextResponse.json({ message: "Appointment Updated Successfully!", updatedAppointment }, { status: 200 });
    } catch (error) {
      console.error("Error updating appointment:", error);
      return NextResponse.json({ message: "Unable To Update Appointment!", error }, { status: 500 });
    }
  }