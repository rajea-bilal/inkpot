import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

// So ProtectedRoute is basically a wrapper around private pages.
// you do not want random visitors to see private user pages.
// Only allow the user to see this if they are logged in
const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />; // component redirects
  }
  return children;
};

export default Protected;
