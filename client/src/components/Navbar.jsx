import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/Auth");
  };

  return (
    <>
      <div className="w-full bg-[#3F4F44] p-5 flex justify-between">
        <div>
          <h1 className="text-[#FBFFE4] text-2xl font-custom font-cal hover:cursor-grab inline">
            BookTheMeet
          </h1>
        </div>
        {localStorage.access_token ? (
          <div>
            <Button
              onClick={handleLogout}
              className={
                "font-cal text-[#FBFFE4] hover:bg-[#FBFFE4] hover:text-[#3F4F44]"
              }
              text={"Logout"}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navbar;
