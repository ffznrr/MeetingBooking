import { useQuery } from "@tanstack/react-query";
import { ViewBooking } from "../api/services/BookingServices";

const BookedCheckPage = () => {
  const { status, data, error } = useQuery({
    queryKey: ["fetchBook"],
    queryFn: () => ViewBooking(localStorage.access_token),
  });
  console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#3F4F44] mb-4">
        Booking Details
      </h1>
      {data && data.bookings && data.bookings.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Your Bookings</h2>
          <ul>
            {data.bookings.map((booking, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  <strong>Room:</strong> {booking.roomName}
                </p>
                <p>
                  <strong>Booked Date:</strong> {booking.book_date}
                </p>
                <p>
                  <strong>Start Time:</strong> {booking.booked_hour}
                </p>
                <p>
                  <strong>End Time:</strong> {booking.booked_hour_end}
                </p>
                <p>
                  <strong>Status:</strong> {booking.room_condition}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookedCheckPage;
