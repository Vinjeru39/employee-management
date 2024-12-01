import { Outlet, Navigate } from "react-router-dom"; //Outlet is basically what we are going to return if we are logged in i.e. if there is a user i.e. whatever page the user is on, otherwise we use Navigate to be redirected
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;

//replace replaces any past history
