import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import api from "./api/api";
import { useDispatch } from "react-redux";
import {
  authCheckComplete,
  signInStart,
  signInSuccess,
  signOutSuccess,
} from "./redux/user/userSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import type { AppDispatch } from "./redux/store";
import CreateListing from "./pages/CreateListing";
import AllListings from "./pages/AllListings";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const validate = async () => {
      try {
        dispatch(signInStart());

        const { data } = await api.get("/api/auth/validate");
        if (data.success && data.userData) {
          dispatch(signInSuccess(data.userData));
        } else {
          dispatch(signOutSuccess());
        }
      } catch (error) {
        dispatch(signOutSuccess());
        console.log("Error in validate!:", error);
      } finally {
        dispatch(authCheckComplete());
      }
    };
    validate();
  }, [dispatch]);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/all-listings" element={<AllListings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
