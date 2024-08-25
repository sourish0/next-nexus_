import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import appoint from './../../../models/appoint';

export async function POST(req: NextRequest) {

    const reqBody = await req.json()
    const { appointment, status } = reqBody

    try {
        
        await sendEmail({appointment: appointment, username: appointment.creator.name, email: appointment.creator.email, status: status});

        if(appointment.creator.email !== appointment.email){
          await sendEmail({appointment: appointment, username: appointment.name + ' ' + appointment.lastname, email: appointment.email, status: status});
        }

        return NextResponse.json({message: "E-Mail Successfully Sent!"})

    } catch (error) {
        return NextResponse.json({error: `Unable to Send E-Mail: ${error}`})
    }

}