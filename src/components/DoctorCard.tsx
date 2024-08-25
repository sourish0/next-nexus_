"use client"

import Image from "next/image"

export default function DoctorCard({ doctor }) {
    return (
        <a 
            href={`/appointment/${doctor._id}`} 
            className="flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
            <Image 
                className="object-cover w-full rounded-t-lg h-56 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg l-5 mx-6" 
                src={doctor.image} 
                alt={`Image of Dr. ${doctor.name}`} 
                height={224} 
                width={192}
            />
            <div className="flex flex-col justify-between p-6 leading-normal bg-white">
                <h5 className="mb-2 text-2xl font-extrabold text-black">
                    Dr. {doctor.name}
                </h5>
                <p className="mb-1 text-sm font-medium text-gray-700">
                    {doctor.field} Specialist
                </p>
                <p className="mb-3 text-gray-800">
                    Works at: <span className="font-semibold">{doctor.organisation}</span>
                </p>
                <p className="mb-3 text-gray-800">
                    Fees: <span className="font-semibold">${doctor.fees}</span>
                </p>
                <div className="mt-4 text-sm text-gray-600">
                    <p>Age: {doctor.age}</p>
                    <p>Contact: {doctor.contact}</p>
                </div>
            </div>
        </a>
    )
}
