import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL, IF } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const [info, setInfo] = useState({
    fname: "",
    email: "",
    video: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", info.fname);
    formData.append("email", info.email);
    formData.append("userId", post.userId?._id);
    formData.append("title", post.title);
    formData.append("file", info.video);

    try {
      const res = await axios.post(URL + "/api/video/upload", formData);
      navigate("/lspage");
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    console.log("uploading file");
    setInfo({ ...info, video: e.target.files[0] });
    console.log(info);
  };

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

  useEffect(() => {
    fetchPost();
  }, [postId]);
  return (
    <>
      <div className="flex-column">
        <div className="h-[200px] bg-black">
          <div className="flex justify-center py-[100px]">
            <img
              alt="Violin"
              src={post.url}
              className="w-[200px] h-[200px] mb-5 object-right z-10 rounded-full border-solid border-2 shadow-md shadow-black"
            />
          </div>
        </div>
        <div className="flex justify-center mt-[100px]">
          <div className="flex flex-col justify-center items-center mt-2">
            <p className="font-bold">{post.userId?.company}</p>
            <p className="font-bold text-xl mt-2">{post.title}</p>
            <p className="mt-2 w-[100%] bg-gray-100 border-solid border-2 p-2 shadow-lg">{post.desc}</p>
          </div>
        </div>
        <div className="flex mt-[50px] justify-center">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="">
              <label htmlFor="fname" className="font-bold">
                Name:
              </label>
              <input
                type="text"
                placeholder="John doe"
                name="fname"
                className="input ml-3 w-3/4 py-2 px-3"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5">
              <label htmlFor="email" className="font-bold">
                Email:
              </label>
              <input
                className="ml-3 py-2 px-3 w-3/4 "
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div>
              <input
                type="file"
                onChange={handleFile}
                className="mt-3 bg-gray-100"
                required
              ></input>
            </div>
            <div className="mt-3 ">
              <input
                type="Submit"
                className="mt-3 py-2 px-5 font-bold bg-slate-400"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
