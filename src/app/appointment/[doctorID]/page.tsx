"use client";

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';

export default function Appointment({params}) {

  const doctorID = params.doctorID
  const { data: session } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [isAllBooked, setIsAllBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    petname: '',
    pettype: '',
    date: '',
    timeSlot: '',
    status: 'pending'
  });

  const date = new Date()
  date.setDate(date.getDate() + 1)
  const dateStart = date.toISOString().slice(0, 10)
  date.setDate(date.getDate() + 4)
  const dateEnd = date.toISOString().slice(0, 10)

  useEffect(() => {
    const checkAvailibility = async () => {
      const allAppointments = await axios.get(`/api/availability/${doctorID}`)
      setAppointments(allAppointments.data.appointments)
    }
    checkAvailibility();
  }, []);

  const checkHidden = (timeSlot: string) => {
    for(let appointment of appointments) {
      if(appointment.date === formData.date && appointment.timeSlot === timeSlot) {
        if(appointment.timeSlot === formData.timeSlot) {
          formData.timeSlot = ''
        }
        return true
      }
    }
    return false
  }

  const AllBooked = () => {
    return checkHidden("10:00-11:00") && checkHidden("11:00-12:00") && checkHidden("12:00-13:00") && checkHidden("13:00-14:00") && checkHidden("16:00-17:00") && checkHidden("17:00-18:00")
  }

  useEffect(() => {
    setIsAllBooked(AllBooked())
  }, [formData.date])

  const checkType = () => {
    return (formData.pettype !== 'Dog' && formData.pettype !== 'Cat' && formData.pettype !== 'Cattle' && formData.pettype !== 'Bird')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if(e.target.name === 'otherPetType' && checkType()) {
      setFormData({
        ...formData,
        pettype: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/appointments', {
        appointment: formData, 
        userID: session.user.id, 
        doctorID
      });
  
      if (response.status === 200) {
        console.log('Form submitted successfully');
        router.push(`/confirmAppointment/${response.data.appointment._id}`);
      } else {
        console.error('Failed to submit the form');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Schedule an Appointment</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="First Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
              Pet's Name
            </label>
            <input
              type="text"
              id="petname"
              name="petname"
              value={formData.petname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Pet's Name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">
              Type of Pet
            </label>
            <select
              id="pettype"
              name="pettype"
              value={checkType() ? (formData.pettype ? "Other" : "") : formData.pettype}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled defaultValue="true" hidden>Select A Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Cattle">Cattle(Cow, Bull, Buffalo...)</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          { formData.pettype !== '' && checkType() &&
            (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherPetType">
                Select A Type:
              </label>
              <input
                type="text"
                id="otherPetType"
                name="otherPetType"
                value={EventTarget.value}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Mention Pet Type Manually"
                required
              />
            </div>
            )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Select A Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              min={dateStart}
              max={dateEnd}
              value={formData.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlot">
              Select A Time Slot
            </label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled defaultValue="true" hidden>{isAllBooked ? "Sorry, All Slots Are Booked This Day" : "Select A Time Slot"}</option>
              <option value="10:00-11:00" hidden={checkHidden("10:00-11:00")}>10:00-11:00</option>
              <option value="11:00-12:00" hidden={checkHidden("11:00-12:00")}>11:00-12:00</option>
              <option value="12:00-13:00" hidden={checkHidden("12:00-13:00")}>12:00-13:00</option>
              <option value="13:00-14:00" hidden={checkHidden("13:00-14:00")}>13:00-14:00</option>
              <option value="16:00-17:00" hidden={checkHidden("16:00-17:00")}>16:00-17:00</option>
              <option value="17:00-18:00" hidden={checkHidden("17:00-18:00")}>17:00-18:00</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
