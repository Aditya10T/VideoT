import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        company,
        password,
      });
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setError("");
        setUsername(res.data.username);
        setEmail(res.data.email);
        setCompany(res.data.company);
        setPassword(res.data.password);
        navigate("/login");
      }
    } catch (err) {
      if (err.response.data.message) setError(err.response.data.message);
      else setError("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col min-w-screen h-screen">
        <div className="flex items-center bg-black text-white justify-between px-6 h-[60px] w-full py-4">
          <h1 className="text-lg md:text-xl font-extrabold">
            <Link to="/">VideoTestimonial</Link>
          </h1>
          <h3 className="font-bold border-solid border-2 border-indigo-600 py-1 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">
            <Link to="/login">Login</Link>
          </h3>
        </div>
        <div className="flex grow justify-center items-center bg-indigo-100">
          <div className="lg:w-2/5 md:w-1/2 w-2/3">
            <div className="bg-white p-10 rounded-lg shadow-lg min-w-full">
              <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                Register
              </h1>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFfor="password"
                >
                  Password
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                  type="Password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="confirm"
                >
                  Company Name
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                  type="text"
                  name="company"
                  id="company"
                  placeholder="company"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <p className="font-bold flex justify-center mt-2 ">OR</p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full mt-2 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans hover:bg-indigo-600 hover:text-white"
                >
                  Login
                </button>
                {error && <h3 className="text-red-500 text-sm ">{error}</h3>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
