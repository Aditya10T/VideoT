import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/users/password/reset/" + token, {
        password,
        confirmPassword,
      });
      alert("Password changed successfully");
      navigate("/login");
    } catch (error) {
      setPassword("");
      setConfirmPassword("");
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className=" bg-slate-200 min-h-screen flex items-center">
        <div className="sm:w-2/3 md:w-[50%] lg:w[40%] mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-slate-500">
            Fill up the form to reset the password
          </p>
          <form action="" className="my-12">
            <div className="flex flex-col space-y-5">
              <label htmlFor="newpassword">
                <p className="font-medium text-slate-700 pb-2">New Password</p>
                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="confirmPassword">
                <p className="font-medium text-slate-700 pb-2">
                  Confirm Password
                </p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Confirm your Password"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </label>

              <button
                onClick={handleClick}
                className="w-full mt-6 p-2 font-medium text-white bg-indigo-500 hover:bg-indigo-700 rounded-lg border-indigo-500 hover:shadow"
              >
                <span>Reset password</span>
              </button>
              <p className="text-center mt-4 ">
                Not registered yet?{" "}
                <a
                  href="/register"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Register now </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
