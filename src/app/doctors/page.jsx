"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import axios from "axios"
import DoctorCard from "@/components/DoctorCard"

export default function DoctorsPage() {

    const { data: session } = useSession()
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        const getDoctors = async () => {
            const response = await axios.get("api/doctors")
            setDoctors(response.data.doctors)
        }

        getDoctors()
    }, [])

    return (
        <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-screen my-20 ">
            <div>
                <h1 className="text-center text-4xl font-extrabold text-green-700 mb-10">
                    {session ? "Select A Doctor" : "Our Doctors"}
                </h1>
            </div>
            <div className="w-full flex justify-center">
                <div className="rounded-lg shadow px-10 py-10 w-3/4 flex flex-wrap justify-center gap-8">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    )
}
