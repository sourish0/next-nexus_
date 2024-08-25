import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import jwt from "jsonwebtoken";
import Doctor from "@/models/doctor";
import 'dotenv/config';

export async function POST(req: NextRequest) {
  const { contact, password } = await req.json();
  
  // Connect to the database
  await connectToDB();

  // Find the doctor by contact
  const doctor = await Doctor.findOne({ contact });
  
  if (!doctor) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
   console.log(doctor)
  // Compare the provided password with the stored password
  const isValidPassword = (password === doctor.password); // Replace with hashed password comparison in production
  
  if (!isValidPassword) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Generate a JWT token with the doctor's ID and contact information
  const token = jwt.sign(
    { id: doctor._id, contact: doctor.contact ,name: doctor.name},
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  // Construct the absolute URL for the redirect
  const redirectUrl = `${req.nextUrl.origin}/dashboard`;

  // Set the JWT token as an HTTP-only cookie and redirect
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });

  return response;
}
