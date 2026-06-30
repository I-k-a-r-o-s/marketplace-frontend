import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import api from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signOut } from "./redux/user/userSlice";
import type { RootState } from "./redux/store";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentUser) return;

    const validate = async () => {
      try {
        dispatch(signInStart());

        const { data } = await api.get("/api/auth/validate");
        if (data.success && data.userData) {
          dispatch(signInSuccess(data.userData));
        } else {
          dispatch(signOut());
        }
      } catch (error) {
        dispatch(signOut());
        console.log("Error in validate!:", error);
      }
    };
    validate();
  }, [dispatch, currentUser]);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
