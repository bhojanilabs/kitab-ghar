import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;

    return (
      <Navigate
        to={ROUTES.auth}
        replace
        state={{ returnTo }}
      />
    );
  }

  return children;
}