import { useQuery } from "@tanstack/react-query";
import { ViewBooking } from "../api/services/BookingServices";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookedCheckPage = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;

  const { status, data, error } = useQuery({
    queryKey: ["fetchBook", page],
    queryFn: () => ViewBooking(localStorage.access_token, page),
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4 font-cal">
      <h1 className="text-2xl font-semibold text-[#3F4F44] mb-4">
        Booking Details
      </h1>

      {data && data.message.bookings && data.message.bookings.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
            {data.message.bookings.map((booking, index) => (
              <div className="w-full h-full bg-[#3F4F44] p-5 text-[#FBFFE4] tracking-wide">
                <ul>
                  <li key={index}>
                    <p>Room: {booking.Room.name}</p>
                    <p>Booked Date: {booking.book_date}</p>
                    <p>Start Time: {booking.booked_hour}</p>
                    <p>End Time: {booking.booked_hour_end}</p>
                    <p>Status: {booking.room_condition}</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center gap-4">
        {/* Previous Button */}
        <button
          className="px-4 py-2 bg-[#3F4F44] text-[#FBFFE4] rounded-md"
          onClick={() => {
            if (page > 1) {
              window.location.href = `?page=${parseInt(page) - 1}`;
            }
          }}
          disabled={page === "1"}
        >
          Previous
        </button>

        <span className="flex items-center">
          Page {page} of {data.message.totalPages}
        </span>

        {/* Next Button */}
        <button
          className="px-4 py-2 bg-[#3F4F44] text-[#FBFFE4] rounded-md"
          disabled={page === data.message.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookedCheckPage;
