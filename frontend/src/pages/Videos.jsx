import React, { useContext } from "react";
import FacebookShare from "../components/FacebookShare";
import TwitterShare from "../components/TwitterShare";
import WhatsappShare from "../components/WhatsappShare";
import clipboardCopy from "clipboard-copy";
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Videos = ({ video }) => {
  const handleCopyClick = () => {
    clipboardCopy(video.url);
    alert("Video link copied to clipboard")
  };

  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const handleDeleteVideo = async () =>{
     try {
      const res = await axios.delete(URL+"/api/video/"+video._id,{withCredentials:true,});
     window.location.reload();
     } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Couldn't Delete Video");
      }
       window.location.reload();
     }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="sm:flex sm:flex-row flex flex-col sm:ml-35 sm:mt-10 mt-5 h:30 sm:max-h-29">
          <video
            className="rounded-lg sm:h-25 w-72 border-2 object-cover shadow-lg shadow-indigo-200"
            controls
          >
            <source src={video.url} type="video/mp4" />
          </video>
          <div className="sm:w-1/2 sm:flex sm:flex-row ml-2 flex flex-col sm:ml-4 sm:mt-10">
            <div className="flex flex-col">
              <h1 className="font-bold text-1xl">{video.title}</h1>
              <p className="mt-2">Uploaded By: {video.name}</p>
              <p className="mt-2">Email: {video.email}</p>
              <p className="cursor-pointer mt-2">
                <MdDelete size={20} color="red" onClick={handleDeleteVideo} />
              </p>
            </div>
            <div className="flex flex-row sm:flex sm:flex-row">
              <FacebookShare lnk={video.url} />
              <TwitterShare lnk={video.url} />
              <WhatsappShare lnk={video.url} />

              <div className="ml-2 sm:ml-5 sm:mt-2 mt-3">
                <button
                  onClick={handleCopyClick}
                  className="sm:flex sm:justify-start sm:mt-2 text-black "
                >
                  <FaCopy size={20} className="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
