import { Link} from "react-router-dom";
import FacebookShare from "../components/FacebookShare";
import TwitterShare from "../components/TwitterShare";
import WhatsappShare from "../components/WhatsappShare";
import clipboardCopy from "clipboard-copy";
import { FaCopy } from "react-icons/fa";

const HomePosts = ({ post }) => {
  const urll = "localhost:5173" + "/upload/" + post._id;
  const handleCopyClick = () => {
    clipboardCopy(urll);
  };
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="h-[200px] flex justify-center items-center">
      <Link to={`/posts/post/${post._id}`}>
        <img src={post.url} alt="" className="h-[200px] w-[200px] rounded-full object-cover" />
        </Link>
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
        <Link to={`/posts/post/${post._id}`}>
          {post.title}
        </Link>
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
        <div className="flex flex-row sm:flex sm:flex-row">
              <FacebookShare lnk={post?.url} />
              <TwitterShare lnk={post?.url} />
              <WhatsappShare lnk={post?.url} />

              <div className="ml-2 sm:ml-5 sm:mt-2 mt-3">
                <button
                  onClick={handleCopyClick}
                  className="sm:flex sm:justify-start sm:mt-2 text-black "
                >
                  <FaCopy size={20} className="" />
                  <p className="ml-2 text-blue-600">Copy campaign Link</p>
                </button>
              </div>
            </div>
      </div>
    </div>
  );
};

export default HomePosts;
