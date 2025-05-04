import { useState, useEffect } from "react";
import Auth from "../components/Auth";
import Navbar from "../components/Navbar";

const AuthPage = ({ URL }) => {
  return (
    <>
      <div
        className={`w-full min-h-screen 
           md:flex md:justify-center
        `}
      >
        <Navbar />
        <Auth />
      </div>
    </>
  );
};

export default AuthPage;
