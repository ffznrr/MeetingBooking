import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchRoomDetail, PostBooking } from "../api/services/RoomServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Toastify from "toastify-js";
import Button from "../components/Button";

const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { status, data, error } = useQuery({
    queryKey: ["fetchRoomDetail", id],
    queryFn: () => fetchRoomDetail(id, localStorage.access_token),
  });

  const booked = data?.message?.Bookings || [];

  const { search } = useLocation();
  const dateParam = new URLSearchParams(search).get("date");

  const [selectedTimeStart, setSelectedTimeStart] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");

  const dataClock = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const currDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
  };

  const hour = () => {
    const d = new Date();
    return d.getHours();
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  const getYear = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const isTimeBooked = (time) => {
    const year = getYear(dateParam);
    return booked?.some(
      (booking) => booking.booked_hour === time && booking.book_date === year
    );
  };

  const handleTimeSelect = (time) => {
    if (
      (time.split(":")[0] >= hour() ||
        getYear(currDate()) !== getYear(dateParam)) &&
      !isTimeBooked(time)
    ) {
      if (!selectedTimeStart) {
        setSelectedTimeStart(time);
        Toastify({
          text: `Start Time Set: ${time}`,
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "linear-gradient(to right, #3F4F44, #3F4F44)",
          },
        }).showToast();
      } else {
        setSelectedTimeEnd(time);
        setTimeout(() => {
          Toastify({
            text: `End Time Set: ${time}`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(to right, #3F4F44, #3F4F44)",
            },
          }).showToast();
        }, 2000);
      }
    } else {
      Toastify({
        text: "Cannot select this time slot",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #C5172E, #FF4C4C)",
        },
      }).showToast();
    }
  };

  const { mutate } = useMutation({
    mutationFn: PostBooking,
    onSuccess: (data) => {
      setTimeout(() => {
        Toastify({
          text: data.message,
          duration: 7000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "linear-gradient(to right, #3F4F44, #3F4F44)",
          },
        }).showToast();
      }, 2000);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmitSession = () => {
    const obj = {
      book_date: getYear(dateParam),
      booked_hour: selectedTimeStart,
      booked_hour_end: selectedTimeEnd,
      roomId: id,
      token: localStorage.access_token,
    };

    mutate(obj);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#3F4F44] mb-4">
        {data?.message?.name}
      </h1>

      <div className="bg-[#3F4F44] text-[#FBFFE4] p-4 rounded-md shadow-md mb-4">
        <p>
          <strong>Floor:</strong> {data?.message?.floor}
        </p>
        <p>
          <strong>Details:</strong> {data?.message?.detail}
        </p>
      </div>

      <h2 className="text-xl font-semibold text-[#3F4F44] mb-4">
        Available Times
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {dataClock.map((time, i) => (
          <div key={i} className="relative">
            <div
              onClick={() => handleTimeSelect(time)}
              className={`border-2 w-full h-20 flex justify-center items-center cursor-pointer rounded-md 
                ${
                  time.split(":")[0] < hour() &&
                  getYear(currDate()) === getYear(dateParam)
                    ? isTimeBooked(time)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#3F4F44] text-[#FBFFE4]"
                    : "bg-[#FBFFE4] text-[#3F4F44]"
                }
                ${
                  selectedTimeStart === time || selectedTimeEnd === time
                    ? "border-[#3F4F44] text-2xl"
                    : ""
                }
              `}
            >
              <h2>{isTimeBooked(time) ? "Booked" : time}</h2>
            </div>
            {selectedTimeStart === time && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full bg-green-400 flex justify-center items-center">
                <h1 className="text-xl text-[#3F4F44]">Start</h1>
              </div>
            )}
            {selectedTimeEnd === time && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full bg-red-400 flex justify-center items-center">
                <h1 className="text-xl text-[#3F4F44]">End</h1>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTimeStart && selectedTimeEnd && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[#3F4F44]">
            Selected Time Slot: {selectedTimeStart} -{" "}
            {Number(selectedTimeEnd.split(":")[0]) +
              1 +
              ":" +
              selectedTimeEnd.split(":")[1]}
          </h3>
        </div>
      )}
      {selectedTimeStart && selectedTimeEnd && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleSubmitSession}
            text={"Submit"}
            className={"bg-[#FBFFE4] text-[#3F4F44]"}
          />
        </div>
      )}
    </div>
  );
};

export default Session;
