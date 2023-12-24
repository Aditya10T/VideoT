import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { URL } from "../url";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const fdata = new FormData();
    fdata.append("title", title);
    fdata.append("desc", desc);
    fdata.append("username", user.username);
    fdata.append("userId", user._id);
    fdata.append("categories", cats);
    fdata.append("file", file);
    // console.log(data)
    //img upload
    try {
      const res = await axios.post(URL + "/api/posts/create", fdata, {
        withCredentials: true,
      });
      navigate(`/myblogs/${res._id}`);
      // console.log(imgUpload.data)
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
    //post upload
    // console.log(post)
    // navigate("/posts/post/" + res.data._id);
    // console.log(res.data)
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="grow px-6 md:px-[200px] bg-indigo-50">
        <h1 className="font-bold md:text-2xl text-xl mt-4 ">Create a post</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          encType="multipart/form-data"
        >
          <label htmlFor="title" className="md:-mb-6 font-bold">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 mt-2 outline-none"
            name="title"
            required
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
            required
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-indigo-600 text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <label className="font-bold">Instructions</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={8}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post instructions"
            required
          />
          <button
            onClick={handleCreate}
            className="bg-indigo-600 w-full md:w-[20%] mx-auto text-white font-semibold px-2 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
