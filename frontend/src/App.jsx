import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { useContext, useEffect } from "react";
import { UserContextProvider } from "./context/UserContext";
import { UserContext } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";
import Upload from "./pages/Upload";
import LsPage from "./pages/LsPage";
import Videos from "./pages/Videos";
import UserVideos from "./pages/UserVideos";
import ProtectedRoute from "./pages/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/write"
            element={<ProtectedRoute Component={CreatePost} />}
          />
          <Route
            exact
            path="/posts/post/:id"
            element={<ProtectedRoute Component={PostDetails} />}
          />
          <Route
            exact
            path="/edit/:id"
            element={<ProtectedRoute Component={EditPost} />}
          />
          <Route
            exact
            path="/myblogs/:id"
            element={<ProtectedRoute Component={MyBlogs} />}
          />
          <Route
            exact
            path="/profile/:id"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            exact
            path="/videos/:userId"
            element={<ProtectedRoute Component={UserVideos} />}
          />
        </Routes>
      </UserContextProvider>
      <Routes>
        <Route exact path="/upload/:id" element={<Upload />} />
        <Route exact path="/lspage/" element={<LsPage />} />
      </Routes>
    </>
  );
};

export default App;
