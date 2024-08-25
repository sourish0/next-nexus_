import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function AppointmentCard({
  appointment,
  handleAccept = () => {},
  handleReject = () => {},
}) {
  return (
    <Card
      className={`p-4 transition-transform transform hover:scale-105 ${
        appointment.status === "pending"
          ? "bg-yellow-200 border-yellow-400"
          : appointment.status === "accepted"
          ? "bg-green-200 border-green-400"
          : "bg-red-200 border-red-400"
      } rounded-lg mb-4 shadow-lg border`}
    >
      <CardHeader>
        <CardTitle>
          <p className="text-lg font-semibold text-gray-700">
            Appointment for {appointment.petname}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p><strong>Owner Name:</strong> {appointment.name} {appointment.lastname}</p>
        <p><strong>Owner Email:</strong> {appointment.email}</p>
        <p><strong>Pet Type:</strong> {appointment.pettype}</p>
        {appointment.doctor && (
          <>
            <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
            <p><strong>Doctor Email:</strong> {appointment.doctor.contact}</p>
            <p><strong>Place:</strong> {appointment.doctor.organisation}</p>
            <p><strong>Fees:</strong> {appointment.doctor.fees}</p>
          </>
        )}
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
      </CardContent>

      {window.location.pathname === "/pending-appointments" && (
        <CardFooter className="flex justify-end space-x-4 mt-4">
          <Button
            variant="success"
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            onClick={handleReject}
          >
            Reject
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
