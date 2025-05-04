import { useState } from "react";
import Button from "./Button";
import { login, register } from "../api/services/AuthServices";
import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";

const Auth = () => {
  const [SeenPassword, setSeenPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const {
    mutate: loginMutate,
    isLoading: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Toastify({
        text: "Login Success",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #3F4F44)",
        },
      }).showToast();
    },
    onError: (error) => {
      Toastify({
        text: error.message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #E83F25)",
        },
      }).showToast();
    },
  });

  const {
    mutate: registerMutate,
    isLoading: isRegistering,
    error: registerError,
  } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      Toastify({
        text: data.message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #E83F25)",
        },
      }).showToast();
    },
    onError: (error) => {
      Toastify({
        text: error.message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #3F4F44, #E83F25)",
        },
      }).showToast();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      registerMutate(formData);
    } else {
      loginMutate(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-amber-200 flex justify-center items-center min-h-screen">
      <div className="relative w-full max-w-md bg-amber-700 flex justify-center items-center">
        {/* Form Login */}
        <div
          className={`transition-all duration-500 ease-in-out absolute w-full ${
            isRegister ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h1 className="font-cal text-center text-2xl mb-5">Login</h1>
          <form onSubmit={handleSubmit} className="w-full px-5">
            <label className="input validator w-full">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label className="input validator w-full mt-5">
              <input
                type={SeenPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <div className="w-full flex justify-center mt-5">
              <Button
                type={"submit"}
                text={isLoggingIn ? "Logging in..." : "Login"}
                className="rounded-sm text-[#FBFFE4] bg-[#3F4F44] hover:bg-amber-200 hover:text-black"
              />
            </div>
            <div className="text-center mt-4">
              <span
                onClick={() => setIsRegister(true)}
                className="text-[#3F4F44] cursor-pointer hover:text-black"
              >
                Don't have an account? Register
              </span>
            </div>
          </form>
        </div>

        {/* Form Register */}
        <div
          className={`transition-all duration-500 ease-in-out absolute w-full ${
            !isRegister ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h1 className="font-cal text-center text-2xl mb-5">Register</h1>
          <form onSubmit={handleSubmit} className="w-full px-5">
            <label className="input validator w-full">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label className="input validator w-full mt-5">
              <input
                type={SeenPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <div className="w-full flex justify-center mt-5">
              <Button
                type={"submit"}
                text={isRegistering ? "Registering..." : "Register"}
                className="rounded-sm text-[#FBFFE4] bg-[#3F4F44] hover:bg-amber-200 hover:text-black"
              />
            </div>
            <div className="text-center mt-4">
              <span
                onClick={() => setIsRegister(false)}
                className="text-[#3F4F44] cursor-pointer hover:text-black"
              >
                Already have an account? Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
