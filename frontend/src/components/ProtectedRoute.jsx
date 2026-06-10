import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return children; // No auth check
};

export default ProtectedRoute;
