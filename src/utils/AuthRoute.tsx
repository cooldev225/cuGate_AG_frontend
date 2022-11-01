import { Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
};
export default AuthRoute;