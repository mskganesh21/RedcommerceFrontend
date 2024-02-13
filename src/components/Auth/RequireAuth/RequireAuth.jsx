import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
