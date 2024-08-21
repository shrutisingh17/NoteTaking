import React, { useState } from "react";
import googleImg from "../assets/google.png";
import googleIcon from "../assets/googleIcon.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const [user, setUser] = useState({});

  const handleSuccess = (response) => {
    const userObject = jwtDecode(response.credential);
    setUser(userObject);
  };

  const handleFailure = () => {
    console.log("Login Failed");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {user.name}
      <div className="flex flex-col justify-center items-center w-96 h-80 border border-solid border-gray-300 rounded-lg">
        <img src={googleImg} alt="img" className="h-7 mb-1" />
        <h1 className="text-2xl -base my-2">Sign in</h1>
        <h2 className="text-lg">Use your Google Account</h2>
        <div className=" bg-white flex items-cente py-1 pr-4 mt-8 -medium text-base shadow-lg rounded text-gray-600">
          <GoogleLogin
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            buttonText="Login with Google"
          />
        </div>
      </div>
    </div>
  );
};
