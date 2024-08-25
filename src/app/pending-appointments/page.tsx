"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AppointmentCard from "@/components/AppointmentCard";

  function  PendingAppointmentsPage() {
    
    const router = useRouter();
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchPendingAppointments = async () => {
        try {
          const response = await axios.get('/api/verify-token');
          const appointmentsResponse = await axios.get(`/api/appointments/doctor/${response.data.data.id}`);
          const pendingAppointments = appointmentsResponse.data.appointment.filter(appointment => appointment.status === 'pending');
          setPendingAppointments(pendingAppointments);

        } catch (error) {
          console.error('Error fetching pending appointments:', error);
          router.push('/doctor-login');
        } finally {
          setLoading(false);
        }
      };

      fetchPendingAppointments();
    }, []);

    const handleAcceptAppointment = async (appointmentId) => {
      try {
        const response = await axios.get(`/api/appointments/${appointmentId}`);
        const appointment = response.data.appointment;
        const { date, timeSlot } = appointment;

        await axios.patch(`/api/appointments/${appointmentId}`, { status: 'accepted' });

        const appointmentsToDelete = pendingAppointments.filter(
          appointment => appointment.date === date && appointment.timeSlot === timeSlot && appointment._id !== appointmentId
        );

        await Promise.all(appointmentsToDelete.map(async (appointment) => {
          await axios.patch(`/api/appointments/${appointment._id}`, { status: 'rejected' });
        }));

        setPendingAppointments(prev => prev.filter(appointment => 
          appointment._id !== appointmentId && 
          !appointmentsToDelete.some(deletedAppointment => deletedAppointment._id === appointment._id)
        ));

        await axios.post(`/api/sendEmail`, {appointment: appointment, status: "accepted"});

      } catch (error) {
        console.error('Error accepting and deleting appointments:', error);
      }

    };

    const handleRejectAppointment = async (appointmentId) => {
      try {

        const response = await axios.get(`/api/appointments/${appointmentId}`);
        const appointment = response.data.appointment;

        await axios.patch(`/api/appointments/${appointmentId}`, { status: 'rejected' });
        setPendingAppointments(prev => prev.filter(appointment => appointment._id !== appointmentId));
        await axios.post(`/api/sendEmail`, {appointment: appointment, status: "rejected"});
      } catch (error) {
        console.error('Error accepting appointment:', error);
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (pendingAppointments.length === 0) {
      return <div>No pending appointments available</div>;
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
    }
    

    const appointmentsUpcoming = pendingAppointments.filter(appointment => compareDate(appointment.date) === "Upcoming");
    const appointmentsToday=  pendingAppointments.filter(appointment => compareDate(appointment.date) === "Today");
    

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

        <h2>Pending Appointments</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div style={{ flex: '1', marginRight: '10px' }}>
            <p>Today's Pending Appointments</p>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              {appointmentsToday.length > 0 ? (
                appointmentsToday.map((appointment) => (
                  <li key={appointment._id}>
                    <AppointmentCard 
                      appointment={appointment} 
                      handleAccept={() => handleAcceptAppointment(appointment._id)} 
                      handleReject={() => handleRejectAppointment(appointment._id)}
                    />
                </li>
                ))
              ) : (
                <p>No Pending Appointments</p>
              )}
            </ul>
          </div>

          <div style={{ flex: '1', marginRight: '10px' }}>
            <p>Upcoming Pending Appointments</p>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              {appointmentsUpcoming.length > 0 ? (
                appointmentsUpcoming.map((appointment) => (
                  <li key={appointment._id}>
                    <AppointmentCard 
                      appointment={appointment} 
                      handleAccept={() => handleAcceptAppointment(appointment._id)} 
                      handleReject={() => handleRejectAppointment(appointment._id)}
                    />
                </li>
                ))
              ) : (
                <p>No Pending Appointments</p>
              )}
            </ul>
          </div>

        </div>

      </div>
    );
}

export default PendingAppointmentsPage