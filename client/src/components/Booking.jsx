import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelbookingServices,
  ViewBooking,
} from "../api/services/BookingServices";
import Toastify from "toastify-js";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const BookedCheckPage = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const page = new URLSearchParams(search).get("page") || 1;

  const { status, data, error, refetch } = useQuery({
    queryKey: ["fetchBook", page],
    queryFn: () => ViewBooking(localStorage.access_token, page),
    keepPreviousData: true,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: (id) => cancelbookingServices(id, localStorage.access_token),
    onSuccess: () => {
      Toastify({
        text: "Booking canceled successfully",
        duration: 7000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #3F4F44)",
        },
      }).showToast();
      refetch();
    },
    onError: (error) => {
      Toastify({
        text: error?.message || "Something went wrong",
        duration: 7000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #3F4F44)",
        },
      }).showToast();
    },
  });

  const handleCancelSubmit = (id) => {
    cancelBookingMutation.mutate(id);
  };

  const handlePageChange = (newPage) => {
    navigate(`${pathname}?page=${newPage}`);
  };

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
              <div
                key={index}
                className="w-full h-full bg-[#3F4F44] p-5 text-[#FBFFE4] tracking-wide flex justify-between"
              >
                <div>
                  <ul>
                    <li key={index}>
                      <p>Room: {booking.Room?.name}</p>
                      <p>Booked Date: {booking?.book_date}</p>
                      <p>Start Time: {booking?.booked_hour}</p>
                      <p>End Time: {booking?.booked_hour_end}</p>
                      <p>Status: {booking?.room_condition}</p>
                    </li>
                  </ul>
                </div>
                {booking.room_condition === "Booked" ? (
                  <div>
                    <Button
                      text={"Cancel Booking"}
                      onClick={() => handleCancelSubmit(booking.id)}
                      className={
                        "w-full p-2 h-fit hover:bg-[#FBFFE4] hover:text-[#3F4F44]"
                      }
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-center bg-[#3F4F44] inline p-2 rounded border-2 text-[#FBFFE4]">
            No bookings data found.
          </p>
        </div>
      )}

      {data && data.message.bookings && data.message.bookings.length > 0 ? (
        <div className="mt-4 flex justify-center gap-4">
          <button
            className={`px-4 py-2  text-[#FBFFE4] rounded-md ${
              page == "1" ? "hidden" : "bg-[#3F4F44]"
            }`}
            disabled={page === "1"}
            onClick={() => handlePageChange(Number(page) - 1)}
          >
            Previous
          </button>

          <span className="flex items-center">
            Page {page} of {data?.message?.totalPages}
          </span>

          <button
            className={`px-4 py-2 bg-[#3F4F44] text-[#FBFFE4] rounded-md ${
              Number(page) === data?.message?.totalPages ? "hidden" : ""
            }`}
            disabled={Number(page) === data?.message?.totalPages}
            onClick={() => handlePageChange(Number(page) + 1)}
          >
            Next
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BookedCheckPage;
