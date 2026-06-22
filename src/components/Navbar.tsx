import { CiMenuFries } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router";

const Navbar = () => {
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
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Estates</a>
      </div>
      <div className="navbar-center">
        <form>
          <label className="input w-auto">
            <input type="search" required placeholder="Search" />
            <LuSearch size={20} className="cursor-pointer"/>
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
        <Link to="/sign-in" className="btn btn-primary rounded-full">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
