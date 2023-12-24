import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";
import { URL } from "../url";
import PostDetails from "./PostDetails";

const MyBlogs = () => {
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id, {
        withCredentials: true,
      });
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  useEffect(() => {
    const logged = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!logged) {
      navigate("/login");
    }
    fetchPosts();
  }, [navigate, user]);

  return (
    <div className="h-full mb-2">
      <Navbar />
      <div className="px-8 md:px-[50px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
                <HomePosts key={post._id} post={post} />
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
