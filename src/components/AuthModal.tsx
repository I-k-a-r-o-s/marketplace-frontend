import { useRef, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuLogIn, LuUserPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signOut,
} from "../redux/user/userSlice";

type AuthMode = "signin" | "signup";

const AuthModal = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = (nextMode: AuthMode) => {
    setMode(nextMode);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const switchModals = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signInStart());
    try {
      switch (mode) {
        case "signin": {
          const { data } = await api.post("/api/auth/signin", {
            email: formData.email,
            password: formData.password,
          });
          if (data.success) {
            dispatch(signInSuccess(data.userData));
            toast.success(data.message);
            closeModal();
            navigate("/");
          } else {
            toast.error(data.message);
          }
          break;
        }

        case "signup": {
          const { data } = await api.post("/api/auth/signup", formData);
          if (data.success) {
            dispatch(signInSuccess(data.userData));
            toast.success(data.message);
            closeModal();
            navigate("/");
          } else {
            toast.error(data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      dispatch(signOut());
      console.error("Error in handleAuth:", error);
      toast.error(error.response?.data?.message || "Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary btn-sm sm:btn-md rounded-full gap-1"
        onClick={() => openModal("signin")}
      >
        Sign In
        <BiLogIn size={20} />
      </button>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-md rounded-3xl border border-base-300/60 bg-base-100 p-6 shadow-2xl sm:p-8">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
            onClick={closeModal}
            aria-label="Close auth modal"
            type="button"
          >
            <MdClose size={20} />
          </button>

          <div className="text-center">
            <h3 className="text-2xl font-bold">
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </h3>
            <p className="mt-2 text-sm opacity-70">
              {mode === "signin"
                ? "Enter your credentials to access your account."
                : "Create a new account to get started."}
            </p>
          </div>

          <form className="mt-6 w-full" onSubmit={handleAuth}>
            <fieldset className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1 text-left">
                  <label className="label px-0 pb-1 pt-0">
                    <span className="label-text font-medium">Username</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-2xl validator"
                    placeholder="Username"
                    required
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength={3}
                    maxLength={20}
                    title="Username must start with a letter and can contain letters, numbers, and hyphens. Length: 3-20 characters."
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  <p className="validator-hint hidden">
                    Must be 3 to 20 characters long, starting with a letter and
                    <br />
                    can contain letters, numbers, and hyphens.
                  </p>
                </div>
              )}
              <div className="space-y-1 text-left">
                <label className="label px-0 pb-1 pt-0">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full rounded-2xl validator"
                  placeholder="Email"
                  required
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
                <p className="validator-hint hidden">
                  Enter valid email address
                </p>
              </div>

              <div className="space-y-1 text-left">
                <label className="label px-0 pb-1 pt-0">
                  <span className="label-text font-medium">Password</span>
                </label>

                <div className="relative validator">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full rounded-2xl pr-12 validator"
                    minLength={8}
                    placeholder="Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    required
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    title={showPassword ? "Hide password" : "Show password"}
                    disabled={loading}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>

                <p className="validator-hint hidden">
                  Must be more than 8 characters, including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter
                </p>
              </div>

              <button
                className="btn btn-primary w-full rounded-2xl"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : mode === "signin" ? (
                  <>
                    Sign In <LuLogIn size={20} />
                  </>
                ) : (
                  <>
                    Sign Up <LuUserPlus size={20} />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-base-content/70">
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  className="ml-1 text-primary underline cursor-pointer disabled:cursor-default"
                  disabled={loading}
                  onClick={switchModals}
                >
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </fieldset>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AuthModal;
