import { CiMenuFries } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
import api from "../api/api";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const { data } = await api.post("api/auth/signout");
      if (data.success) {
        dispatch(signOutSuccess());
        toast.success(data.message);
      } else {
        dispatch(signOutFailure());
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error in handleSignOut!:", error);
      toast.error(
        error?.response?.data?.message ||
          "Internal Server Error!",
      );
      dispatch(signOutFailure());
    }
  };

  const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("searchTerm", searchTerm);

      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    } catch (error: any) {
      console.error("Error in handleSearch:", error);
      toast.error(error.response?.data?.message || "Internal Server Error!");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <CiMenuFries size={20} />
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"} className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="link link-hover">
                About
              </Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Estates
        </Link>
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearch}>
          <label className="input w-auto">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <LuSearch size={20} className="cursor-pointer" />
            </button>
          </label>
        </form>
      </div>
      <div className="navbar-end gap-4">
        <ul className="menu menu-horizontal hidden lg:flex px-1 gap-2">
          <li>
            <Link to={"/"} className="link link-hover">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="link link-hover">
              About
            </Link>
          </li>
        </ul>

        {currentUser ? (
          <>
            <Link to={"/create-listing"}>
              <button className="btn btn-success btn-sm">
                <IoMdAdd size={20} />{" "}
                <span className="hidden md:inline">Create Listing</span>
              </button>
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <RxAvatar size={30} className="text-primary" />
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"}>Profile</Link>
                </li>

                <li>
                  <Link to={"/all-listings"}>Your Listings</Link>
                </li>

                <li>
                  <button type="button" onClick={handleSignOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <AuthModal />
        )}
      </div>
    </div>
  );
};

export default Navbar;
