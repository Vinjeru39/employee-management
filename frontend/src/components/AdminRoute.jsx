import { Outlet, Navigate } from "react-router-dom"; //Outlet is what we are going to use if we are logged in, otherwise we use Navigate to be redirected
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
