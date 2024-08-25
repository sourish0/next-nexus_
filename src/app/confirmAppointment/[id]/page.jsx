"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Appointment from './../../appointment/[doctorID]/page';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ConfirmAppointment({params}) {

    const id = params.id;
    const router = useRouter();
    const [details, setDetails] = useState({})

    useEffect(() => {
        const getDetails = async () => {
            const response = await axios.get(`/api/appointments/${id}`);
            setDetails(response.data.appointment)
        }

        getDetails()
    }, [])

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure to CANCEL this Appointment?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Yes, CANCEL it!'
          });
      
          if (result.isConfirmed) {
            try {
                  await axios.delete(`/api/appointments/${id}`);
                  Swal.fire(
                      'Cancelled!',
                      'Your appointment has been cancelled.',
                      'success'
                    );
                    router.push("/");
                } catch (error) {
                  console.error(error);
                }
          }
      }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-2">Confirm Your Appointment</h1>
            <p className="mb-4 text-yellow-800 font-bold">Appointment has been Created and will NOT be Deleted unless Cancelled.</p>

            <h2 className="font-bold">Patient Details :-</h2>
            <p><span className="text-blue-800 font-semibold">Owner:</span> {`${details.name} ${details.lastname}`}</p>
            <p><span className="text-blue-800 font-semibold">Email:</span> {details.email}</p>
            <p><span className="text-blue-800 font-semibold">Pet's Name:</span> {details.petname}</p>
            <p><span className="text-blue-800 font-semibold">Pet's Type:</span> {details.pettype}</p>
            <br />

            <h2 className="font-bold">Doctor Details :-</h2>
            <p><span className="text-blue-800 font-semibold">Doctor's Name:</span> {details.doctor?.name}</p>
            <p><span className="text-blue-800 font-semibold">Doctor's Email:</span> {details.doctor?.contact}</p>
            <p><span className="text-blue-800 font-semibold">Doctor's Age:</span> {details.doctor?.age}</p>
            <p><span className="text-blue-800 font-semibold">Doctor's Specialisation:</span> {details.doctor?.field}</p>
            <br />

            <h2 className="font-bold">Appointment Details :-</h2>
            <p><span className="text-blue-800 font-semibold">Appointment Date:</span> {details.date}</p>
            <p><span className="text-blue-800 font-semibold">Appointment Time Slot:</span> {details.timeSlot}</p>
            <p><span className="text-blue-800 font-semibold">Place:</span> {details.doctor?.organisation}</p>
            <p><span className="text-blue-800 font-semibold">Visiting Fees:</span> {details.doctor?.fees}</p>
        </div>


        <div className="inline">
            <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 mx-5 my-2 rounded-lg hover:bg-red-700 transition-colors">
                Cancel Appointment
            </button>
            <button onClick={() => {router.push("/")}} className="bg-blue-600 text-white py-2 px-4 mx-5 my-2 rounded-lg hover:bg-blue-700 transition-colors">
                Confirm Appointment
            </button>
        </div>
        
        </main>
    );
}