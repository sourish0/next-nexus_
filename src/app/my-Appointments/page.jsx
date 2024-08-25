"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentCard from "@/components/AppointmentCard";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const appointmentsResponse = await axios.get(`/api/appointments/user/${session.user.id}`);
        setAppointments(appointmentsResponse.data.appointment);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      getAllAppointments();
    } else {
      router.push("/");
    }
  }, [session]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const compareDate = (dateString) => {
    const storedDate = new Date(dateString);
    storedDate.setHours(0, 0, 0, 0); // Set storedDate time to midnight (local time)
    const today = new Date(); // Get today's date (without time)
    today.setHours(0, 0, 0, 0);
    // Compare the dates
    if (storedDate.getTime() === today.getTime()) {
      return "Today";
    } else if (storedDate.getTime() > today.getTime()) {
      return "Upcoming";
    } else {
      return "Previous";
    }
  };

  const appointmentsUpcoming = appointments.filter(appointment => appointment.status !== "rejected" && compareDate(appointment.date) === "Upcoming");
  const appointmentsPrevious = appointments.filter(appointment => appointment.status !== "rejected" && compareDate(appointment.date) === "Previous");
  const appointmentsToday = appointments.filter(appointment => appointment.status !== "rejected" && compareDate(appointment.date) === "Today");
  const appointmentsRejected = appointments.filter(appointment => appointment.status === "rejected");

  return (
    <div className="p-6 space-y-6 font-sans m-24">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4">
        <img
          src={session.user.image}
          alt="Profile Image"
          className="h-24 w-24 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold">Welcome {session.user.name}</h1>
          <p className="text-lg text-gray-700">Email: {session.user.email}</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>

        <div className="flex flex-col flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <p className="font-medium mb-2">Upcoming Appointments</p>
            <ul className="list-none p-0">
              {appointmentsUpcoming.length > 0 ? (
                appointmentsUpcoming.map((appointment) => (
                  <li key={appointment._id} className="mb-4">
                    <AppointmentCard appointment={appointment} />
                  </li>
                ))
              ) : (
                <div className=''>
                  <p className="text-gray-500">No Upcoming Appointments</p>
                </div>
                
              )}
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <p className="font-medium mb-2">Today's Appointments</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
              {appointmentsToday.length > 0 ? (
                appointmentsToday.map((appointment) => (
                  <div key={appointment._id} className="">
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Appointments for Today</p>
              )}
              
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <p className="font-medium mb-2">Previous Appointments</p>
            <div className="list-none p-0">
              {appointmentsPrevious.length > 0 ? (
                appointmentsPrevious.map((appointment) => (
                  <li key={appointment._id} className="mb-4">
                    <AppointmentCard appointment={appointment} />
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No Previous Appointments</p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <p className="font-medium mb-2">Rejected Appointments</p>
            <div className="">
              {appointmentsRejected.length > 0 ? (
                appointmentsRejected.map((appointment) => (
                  <div key={appointment._id} className="mb-4">
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Rejected Appointments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
