import { useQuery } from "@tanstack/react-query";
import { fetchRoom } from "../api/services/RoomServices";
import { useEffect, useState } from "react";

import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const { status, data, error } = useQuery({
    queryKey: ["fetchRoom"],
    queryFn: () => fetchRoom(localStorage.access_token),
  });

  const navigate = useNavigate();
  const currDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const [targetDate, setTargetDate] = useState(currDate());

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error?.message || "An unknown error occurred"}</div>;
  }

  if (status === "success") {
    return (
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-cal font-semibold mb-4 text-[#3F4F44]">
            Available Rooms
          </h1>
          {data && data.rooms.length > 0 ? (
            <form>
              <input
                type="date"
                className="input bg-[#3F4F44] text-[#FBFFE4]"
                min={currDate()}
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </form>
          ) : (
            <div></div>
          )}
        </div>

        {data && data.rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.rooms?.map((room) => (
              <div
                key={room.id}
                className="bg-[#3F4F44] p-4 rounded-md shadow-md mb-4 text-[#FBFFE4] flex justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{room.name}</h2>
                  <p className="text-sm">Floor: {room.floor}</p>
                  <p className="text-sm">Facility: {room.detail}</p>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      navigate(`/reserve/${room.id}?date=${targetDate}`)
                    }
                    className={
                      "my-auto hover:bg-[#FBFFE4] hover:text-[#3F4F44] rounded-tr-md"
                    }
                    text={"Reserve"}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-3xl font-cal border-2 bg-[#3F4F44] py-2 px-3 text-[#FBFFE4] ">
              Data Not Found
            </h1>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Room;
