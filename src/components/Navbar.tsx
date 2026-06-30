import { CiMenuFries } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

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
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="link link-hover">
                About
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Estates</a>
      </div>
      <div className="navbar-center">
        <form>
          <label className="input w-auto">
            <input type="search" required placeholder="Search" />
            <LuSearch size={20} className="cursor-pointer" />
          </label>
        </form>
      </div>
      <div className="navbar-end gap-4">
        <ul className="menu menu-horizontal hidden lg:flex px-1 gap-2">
          <li>
            <Link to="/" className="link link-hover">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link link-hover">
              About
            </Link>
          </li>
        </ul>
        {currentUser ? (
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </div>
  );
};

export default Navbar;
