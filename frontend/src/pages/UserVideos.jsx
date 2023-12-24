import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import Videos from "./Videos";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //   console.log(user)
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const fetchVideos = async () => {
    setLoader(true);
    try {
      //   console.log(user)
      const res = await axios.get(
        URL +
          "/api/video/user/" +
          user._id +
          `?search=${search}` +
          `&page=${pageNumber}`,
        { withCredentials: true }
      );
      console.log(res)
      setVideos(res.data?.videos);
      setNumberOfPages(res.data.totalPages);
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
    fetchVideos();
  }, [user, search, pageNumber]);

  useEffect(() => {
    const logged = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!logged) {
      navigate("/login");
    }
    fetchVideos();
  }, [navigate, user]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div className="min-h-screen min-w-screen overflow-auto bg-indigo-50">
      <Navbar />
      <div className="flex justify-center bg-indigo-50">
        <input
          className="py-2 w-80 px-2 ml-40 md:ml-3.5 mt-5 rounded-md border-solid border-1 border-2 border-black"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="bg-indigo">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          videos.map((video) => (
            <>
              <Videos key={video._id} video={video} />
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <div className="flex justify-center mt-8 text-xl font-bold text-black-600">
        <button
          className="mr-5 border-solid border-1 border-indigo-400 px-2 rounded-md shadow-md bg-indigo-500 text-white hover:bg-emerald-400"
          onClick={gotoPrevious}
        >
          Previous
        </button>
        {pages.map((pageIndex) => (
          <button
            className="ml-2"
            key={pageIndex}
            onClick={() => setPageNumber(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          className="ml-5 border-solid border-1 border-indigo-400 px-2 rounded-md shadow-md bg-indigo-500 text-white hover:bg-emerald-400"
          onClick={gotoNext}
        >
          Next
        </button>
      </div>
      <p className="flex justify-center mt-5">
        Page {`${pageNumber + 1}`} of {`${numberOfPages}`}
      </p>
    </div>
  );
};

export default UserVideos;
