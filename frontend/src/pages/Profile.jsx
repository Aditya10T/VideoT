import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { IF, URL } from "../url";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, oldPassword, newPassword },
        { withCredentials: true }
      );
      // console.log(res.data)
      alert("User updated successfully");
      window.location.reload();
    } catch (err) {
      setUpdated(false);
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.clear();
      navigate("/register");
      // console.log(res.data)
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };
  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  useEffect(() => {
    const logged = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!logged) {
      navigate("/login");
    }
    fetchProfile();
    fetchUserPosts();
  }, [navigate, user]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="grow sm:flex sm:flex-row flex flex-col-reverse justify-end overflow-auto">
          <div className="sm:w-2/3 overflow-auto">
            <h1 className="font-bold mt-2 ml-2">YOUR POSTS:</h1>
            {posts?.map((p) => (
              <ProfilePosts key={p._id} p={p} />
            ))}
          </div>
          <div className="sm:w-1/3 ml-2">
            <h1 className="font-bold mt-2">PROFILE</h1>
            <h1 className="mt-2">Username:</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-2 py-2 mt-1 bg-gray-300 text-gray-500 focus:ring-2 focus:ring-blue-400 border-solid border-2xl focus:border-blue-500 rounded-lg"
              placeholder="Your username"
              type="text"
            />
            <h1 className="mt-2">Email:</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-2 py-2  bg-gray-300 text-gray-500 focus:ring-2 focus:ring-blue-400 border-solid border-2xl focus:border-blue-500 rounded-lg"
              placeholder="Your email"
              type="email"
            />
            <h1 className="mt-2">Old Password:</h1>
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              className="outline-none px-2 py-2  bg-gray-300 text-gray-500  focus:ring-blue-400 border-solid border-2xl focus:border-blue-500 rounded-lg"
              placeholder="Old Password"
              type="password"
            />
            <h1 className="mt-2">New Password:</h1>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="outline-none px-2 py-2  bg-gray-300 text-gray-500  focus:ring-blue-400 border-solid border-2xl focus:border-blue-500 rounded-lg"
              placeholder="New password"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
              <div>
                {updated && (
                  <h3 className="text-green-500 text-sm text-center mt-4">
                    user updated successfully!
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
