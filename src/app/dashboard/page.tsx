"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentCard from "@/components/AppointmentCard";
import { Separator } from '@/components/ui/separator';

export default function Page() {

  const router = useRouter();
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const getAllAppointments = async () => {
        try {
          const response = await axios.get('/api/verify-token');
          setDoctorData(response.data.data.id);
          const appointmentsResponse = await axios.get(`/api/appointments/doctor/${response.data.data.id}`);
          setAppointments(appointmentsResponse.data.appointment);

        } catch (error) {

          console.error('Error fetching data:', error);
          router.push('/doctor-login');

        } finally {
          setLoading(false);
        }
      }

      getAllAppointments();

  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!doctorData) {
    return <div className="flex justify-center items-center h-screen">No doctor data available</div>;
  }
  
  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      router.push('/doctor-login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

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
  }
  

  const appointmentsUpcoming = appointments.filter(appointment => appointment.status === "accepted" && compareDate(appointment.date) === "Upcoming");
  const appointmentsPrevious=  appointments.filter(appointment => appointment.status === "accepted" && compareDate(appointment.date) === "Previous");
  const appointmentsToday=  appointments.filter(appointment => appointment.status === "accepted" && compareDate(appointment.date) === "Today");
  
  return (
    <div className="p-6 font-sans mx-20 my-20">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome Dr. {appointments[0].doctor.name}
        </h1>
        <p className="text-lg text-gray-600">
          Contact: {appointments[0].doctor.contact}
        </p>
      </div>

      <div className="mt-6 flex justify-between space-x-4">
        <button
          onClick={() => router.push('/pending-appointments')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Pending Appointments
        </button>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          
        <div className="flex flex-col gap-6 m-10 justify-center">
          <div className='flex flex-col justify-center'>
            <h3 className="text-lg font-medium mb-2 text-center">Today's Appointments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {appointmentsToday.length > 0 ? (
                appointmentsToday.map((appointment) => (
                  <div key={appointment._id}>
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <p>No Appointments for Today</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Separator className='w-5/6 h-1 bg-black'/>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Upcoming Appointments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {appointmentsUpcoming.length > 0 ? (
                appointmentsUpcoming.map((appointment) => (
                  <div key={appointment._id}>
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <p>No Upcoming Appointments</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Separator className='h-1 bg-black w-5/6 mx-auto'/>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-center">Previous Appointments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {appointmentsPrevious.length > 0 ? (
                appointmentsPrevious.map((appointment) => (
                  <div key={appointment._id}>
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <p>No Previous Appointments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
