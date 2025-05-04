import Button from "./Button";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-[#3F4F44] p-5">
        <div>
          <h1 className="text-[#FBFFE4] text-2xl font-custom font-cal hover:cursor-grab  inline">
            BookTheMeet
          </h1>
        </div>
        {localStorage.access_token ? (
          <div>
            <Button className={"font-cal"} text={"Logout"} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navbar;
