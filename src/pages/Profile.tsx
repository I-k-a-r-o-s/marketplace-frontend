import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { IoWarningOutline } from "react-icons/io5";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateInfo = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log("Error in updateInfo!:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="hero bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mt-20">Profile</h1>
          <form className="mt-6 w-full">
            <fieldset className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="label px-0 pb-1 pt-0">
                  <span className="label-text font-medium">Username</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-2xl validator"
                  placeholder={currentUser?.userName}
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

              <div className="space-y-1 text-left">
                <label className="label px-0 pb-1 pt-0">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full rounded-2xl validator"
                  placeholder={currentUser?.email}
                  name="email"
                  value={formData.email}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    disabled={loading}
                    title={showPassword ? "Hide password" : "Show password"}
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
                className="btn btn-primary w-full rounded-2xl mt-10"
                type="submit"
                disabled={loading}
                onClick={updateInfo}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xl"></span>
                ) : (
                  "Update"
                )}
              </button>
            </fieldset>
          </form>
          <button className="btn btn-warning mt-8">
            <IoWarningOutline size={20} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
