import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.user,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;
