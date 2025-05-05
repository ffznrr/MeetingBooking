import { useEffect, useState } from "react";
import Button from "../components/Button";
import Room from "../components/Room";
import Booking from "../components/Booking";

const HomePage = () => {
  const [choseRoom, setChoseRoom] = useState(false);
  const [chooseBook, setChoseBook] = useState(false);

  const handleCondition = () => {
    if (chooseBook) {
      return <Booking />;
    } else {
      return <Room />;
    }
  };

  return (
    <div>
      <div className="w-full h-full flex justify-center mt-5 gap-5">
        <Button
          onClick={() => {
            setChoseBook(false);
            setChoseRoom(true);
          }}
          className="bg-[#3F4F44] text-[#FBFFE4] hover:bg-amber-200 hover:text-[#3F4F44]"
          text="Room"
        />

        <Button
          onClick={() => {
            setChoseRoom(false);
            setChoseBook(true);
          }}
          className="bg-[#3F4F44] text-[#FBFFE4] hover:bg-amber-200 hover:text-[#3F4F44]"
          text="Booked"
        />
      </div>

      {choseRoom || chooseBook ? (
        handleCondition()
      ) : (
        <div className="w-full h-full">
          <h1 className="text-[#3F4F44] text-center text-2xl font-cal mt-5">
            Welcome to the Meeting Room Book Web!
          </h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
