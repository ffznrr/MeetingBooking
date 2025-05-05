import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-amber-200">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
