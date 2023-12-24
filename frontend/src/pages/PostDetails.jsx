import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { URL, IF } from "../url";
import { FaCopy } from "react-icons/fa";
import clipboardCopy from "clipboard-copy";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const urll = "localhost:5173" + "/upload/" + postId;

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data)
      setPost(res.data);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      navigate("/myblogs/" + user._id);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
      navigate(`profile/${user._id}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const logged = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!logged) {
      navigate("/login");
    }
    fetchPost();
  }, [navigate, user]);

  return (
    <div className="flex flex-col min-h-screen w-[100%]">
      <div className="bg-black text-white w-[100%]">
        <Navbar />
      </div>
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="sm:flex sm:flex-grow sm:justify-center">
          <div className="flex justify-center flex-col md:w-[750px] px-[100px] mt-8 sm:mt-2">
            <div className="h-[175px] flex justify-center items-center sm:w-[500px] bg-black">
              <div className="mt-[150px]">
                <img
                  src={post.url}
                  className="w-[105px] h-[105px] sm:w-[150px] sm:h-[150px] rounded-full border-solid border-2 shadow-md shadow-black"
                  alt=""
                />
                <p className="mt-2 font-bold sm:ml-8">{post.title}</p>
                {user?._id === post?.userId?._id && (
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <p
                      className="cursor-pointer"
                      onClick={() => navigate("/edit/" + postId)}
                    >
                      <BiEdit size={20} color="blue" />
                    </p>
                    <p className="cursor-pointer" onClick={handleDeletePost}>
                      <MdDelete size={20} color="red" />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between flex-row mt-20 md:w-[500px]">
              <p>@{post.username}</p>
              <div className="flex sm:flex-end space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              </div>
            </div>
            <div className="flex justify-center overflow-auto flex-col md:w-[500px]">
              <div className="mt-6 border-solid overflow-y-auto border-[1px] px-2 py-2 md:w-[500px] shadow-md shadow-black">
                <h1 className="font-bold ">Instructions:</h1>
                <p className="mx-auto mt-1">{post.desc}</p>
              </div>
              <div className="flex items-center mt-8 space-x-4 font-semibold">
                <p>Categories:</p>
                <div className="flex justify-center items-center py-4 space-x-2">
                  {!post.categories ? (
                    <>
                      <p>Loading..</p>
                    </>
                  ) : post.categories[0] !== "" ? (
                    post.categories?.map((c, i) => (
                      <>
                        <div
                          key={i}
                          className="bg-gray-300 rounded-lg px-3 py-1"
                        >
                          {c}
                        </div>
                        <button
                          onClick={() => {
                            clipboardCopy(urll);
                            alert("copied to clipboard");
                          }}
                          className="sm:flex sm:justify-start sm:mt-2 text-black "
                        >
                          <FaCopy size={20} className="" />
                        </button>
                        <p className="text-blue-500">Copy Campaign Link</p>
                      </>
                    ))
                  ) : (
                    <>
                      <div>No categories added</div>

                      <button
                        onClick={() => {
                          clipboardCopy(urll);
                          alert("copied to clipboard");
                        }}
                        className="flex sm:justify-start sm:mt-2 text-black "
                      >
                        <FaCopy size={20} className="mt-2 sm:mt-1 ml-1" />
                        <p className="ml-2">Copy Campaign Link</p>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
