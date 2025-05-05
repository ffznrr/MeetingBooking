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

  const { search } = useLocation();
  const dateParam = new URLSearchParams(search).get("date");

  const [selectedTimeStart, setSelectedTimeStart] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");

  let bookinghour = data?.message?.Bookings || [];

  const meetingStartTime = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const meetingEndTime = [
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
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

  const handleTimeSelect = (time) => {
    if (selectedTimeStart.length == "") {
      setSelectedTimeStart(time);
      Toastify({
        text: `Set Start Time: ${time}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #3F4F44)",
        },
      }).showToast();
    } else {
      setSelectedTimeEnd(time);
      Toastify({
        text: `Set End Time: ${time}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #3F4F44)",
        },
      }).showToast();
    }
  };

  const { mutate } = useMutation({
    mutationFn: PostBooking,
    onSuccess: (data) => {
      Toastify({
        text: data.message,
        duration: 7000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #3F4F44)",
        },
      }).showToast();

      navigate("/");
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

  const itIsBooked = (time) => {
    if (!bookinghour) return time;
    const matchingBookings = bookinghour.filter(
      (v) =>
        time >= v.booked_hour &&
        time < v.booked_hour_end &&
        v.room_condition == "Booked" &&
        v.book_date == getYear(dateParam)
    );

    if (matchingBookings.length > 0) {
      return "Booked";
    }

    return time;
  };

  const itIsBookedEnd = (time) => {
    if (!bookinghour) return time;
    const matchingBookings = bookinghour.filter(
      (v) =>
        time >= v.booked_hour &&
        time <= v.booked_hour_end &&
        v.room_condition == "Booked" &&
        v.book_date == getYear(dateParam)
    );

    if (matchingBookings.length > 0) {
      return "Booked";
    }

    return time;
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

      {selectedTimeStart == "" ? (
        <h2 className="text-xl font-semibold text-[#3F4F44] mb-4">
          Select Start Meeting Time :
        </h2>
      ) : (
        <h2 className="text-xl font-semibold text-[#3F4F44] mb-4">
          Select End Meeting Time :
        </h2>
      )}
      <div className="grid grid-cols-4 gap-4">
        {selectedTimeStart === ""
          ? meetingStartTime.map((time, i) => (
              <div key={i} className="relative">
                {itIsBooked(time) == "Booked" ? (
                  <div
                    className={`border-2 w-full h-20 flex justify-center items-center cursor rounded-md bg-red-500 text-white
                  ${
                    selectedTimeStart === time || selectedTimeEnd === time
                      ? "border-[#3F4F44] text-2xl"
                      : ""
                  }
                `}
                  >
                    <h2>{itIsBooked(time)}</h2>
                  </div>
                ) : (
                  <div
                    onClick={() => handleTimeSelect(time)}
                    className={`border-2 w-full h-20 flex justify-center items-center cursor-pointer rounded-md hover:text-[#FBFFE4] hover:bg-[#3F4F44]
                  ${
                    selectedTimeStart === time || selectedTimeEnd === time
                      ? "border-[#3F4F44] text-2xl"
                      : ""
                  }
                `}
                  >
                    <h2>{itIsBooked(time)}</h2>
                  </div>
                )}
              </div>
            ))
          : meetingEndTime.map((time, i) => (
              <div key={i} className="relative">
                {itIsBookedEnd(time) == "Booked" ? (
                  <div
                    key={i}
                    className={`border-2 w-full h-20 flex justify-center items-center cursor-pointer rounded-md bg-red-500 text-white`}
                  >
                    <h2>{itIsBookedEnd(time)}</h2>
                  </div>
                ) : (
                  <div
                    key={i}
                    onClick={() => handleTimeSelect(time)}
                    className={`border-2 w-full h-20 flex justify-center items-center cursor-pointer rounded-md hover:bg-[#3F4F44] hover:text-[#FBFFE4]`}
                  >
                    <h2>{itIsBookedEnd(time)}</h2>
                  </div>
                )}
              </div>
            ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleSubmitSession}
          text={"Submit"}
          className={"bg-[#FBFFE4] text-[#3F4F44]"}
        />
      </div>
    </div>
  );
};

export default Session;
